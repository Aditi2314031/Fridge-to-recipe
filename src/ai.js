import { mockRecipes } from './mockRecipes';

// Schema description to guide the LLM
const recipeSchemaInstruction = `
Return a JSON object matching this TypeScript structure:
{
  title: string;
  description: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number; // base number of servings, typically 2 or 4
  nutrition: {
    calories: number; // per serving
    protein: string; // e.g. "15g"
    carbs: string; // e.g. "45g"
    fat: string; // e.g. "12g"
  };
  ingredients: Array<{
    name: string; // ingredient name, keep it clean
    baseAmount: number; // numeric quantity for the base servings
    unit: string; // unit of measure, e.g. "g", "ml", "tbsp", "tsp", "cloves", "units", "cups"
    swaps: string[]; // 2-3 common/practical swap suggestions (e.g., "tofu" instead of "chicken", "oat milk" instead of "milk")
  }>;
  steps: Array<{
    text: string; // step instruction, clear and concise
    durationMinutes?: number; // if the step involves waiting/cooking for a specific duration, specify the time in minutes (e.g., boiling, baking, simmering). This is optional.
  }>;
}
`;

/**
 * Generates a recipe based on ingredients and preferences.
 * If apiKey is provided, it calls Gemini.
 * Otherwise (or on error), it uses the smart mock compiler.
 */
export async function generateRecipe(ingredientsText, preferences, apiKey, isDemoMode) {
  if (isDemoMode || !apiKey) {
    // Simulate network delay for a realistic feel
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return generateLocalRecipe(ingredientsText, preferences);
  }

  const prompt = `
You are a master chef. Create a single recipe based on the user's available ingredients and dietary preferences.
Available Ingredients: ${ingredientsText}
Dietary Preferences: ${preferences.join(', ') || 'None'}

Rules:
1. Focus heavily on using the available ingredients, but you can include common pantry items like oil, butter, salt, pepper, garlic, water, sugar.
2. The recipe MUST strictly respect the selected dietary preferences (e.g. if Vegetarian/Vegan, no meat/fish; if Gluten-Free, no gluten; if Dairy-Free, no milk/butter).
3. The response MUST be a single, valid JSON object containing only the JSON, matching the schema below. Do not put markdown blocks like \`\`\`json \`\`\` around it if possible, or if you do, ensure it is clean.

Schema:
${recipeSchemaInstruction}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      throw new Error('No content returned from Gemini API.');
    }

    // Parse the JSON content
    const parsedRecipe = JSON.parse(textResponse.trim());
    return parsedRecipe;
  } catch (error) {
    console.error('Gemini API Error, falling back to local generator:', error);
    // Return a local generated recipe with a flag indicating fallback
    const fallbackRecipe = generateLocalRecipe(ingredientsText, preferences);
    fallbackRecipe.fallbackNote = `Note: Real-time AI failed (${error.message || 'Network issue'}). Displaying a smart matching recipe.`;
    return fallbackRecipe;
  }
}

/**
 * Smart Local Fallback Compiler
 */
function generateLocalRecipe(ingredientsText, preferences) {
  const cleanInput = ingredientsText.toLowerCase();
  const inputWords = cleanInput.split(/[\s,]+/);

  let bestRecipe = null;
  let maxScore = 0;

  // Score mock recipes based on match count
  for (const recipe of mockRecipes) {
    let score = 0;
    
    // Check match on title
    if (recipe.title.toLowerCase().split(/\s+/).some(w => inputWords.includes(w))) {
      score += 2;
    }

    // Check match on ingredients
    for (const ing of recipe.ingredients) {
      const ingName = ing.name.toLowerCase();
      if (inputWords.some(word => word.length > 2 && ingName.includes(word))) {
        score += 3;
      }
    }

    // Check if recipe is compatible with selected preferences
    // (This is a simplified check for the mock data)
    let isCompatible = true;
    if (preferences.includes('Vegan')) {
      // Vegans don't eat chicken, heavy cream, butter, eggs, cheese, honey
      const nonVeganKeywords = ['chicken', 'cream', 'butter', 'egg', 'cheese', 'parmesan', 'honey'];
      if (recipe.ingredients.some(ing => nonVeganKeywords.some(keyword => ing.name.toLowerCase().includes(keyword)))) {
        isCompatible = false;
      }
    } else if (preferences.includes('Vegetarian')) {
      // Vegetarians don't eat chicken
      if (recipe.ingredients.some(ing => ing.name.toLowerCase().includes('chicken'))) {
        isCompatible = false;
      }
    }

    if (isCompatible && score > maxScore) {
      maxScore = score;
      bestRecipe = recipe;
    }
  }

  // If we found a good match (score > 2), return it (cloned so we don't mutate static mock data)
  if (bestRecipe && maxScore > 2) {
    return JSON.parse(JSON.stringify(bestRecipe));
  }

  // If no match found, dynamically compile a custom "Creative Pantry Bowl" based on user inputs
  const rawIngredients = cleanInput
    .split(',')
    .map(i => i.trim())
    .filter(i => i.length > 0);

  const finalIngredients = rawIngredients.length > 0 ? rawIngredients : ['mixed vegetables', 'rice', 'seasoning'];

  const capitalizedIngs = finalIngredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1));
  const mainIng = capitalizedIngs[0];

  // Dynamic Recipe Creation
  const isVegan = preferences.includes('Vegan');
  const isVegetarian = preferences.includes('Vegetarian') || isVegan;
  const isGlutenFree = preferences.includes('Gluten-Free');

  const title = `Creative ${mainIng} & Grain Bowl`;
  const description = `A gorgeous, custom-tailored dish using your fresh ${finalIngredients.join(', ')}. Seasoned beautifully, roasted, and served warm.`;

  const ingredientsList = finalIngredients.map((ingName, idx) => {
    let amount = 100;
    let unit = 'g';
    let swaps = ['quinoa', 'cauliflower rice', 'roasted sweet potatoes'];

    if (ingName.includes('chicken') || ingName.includes('tofu') || ingName.includes('beef') || ingName.includes('shrimp')) {
      amount = 200;
      unit = 'g';
      swaps = ingName.includes('tofu') ? ['chicken thighs', 'tempeh'] : ['extra firm tofu', 'chickpeas'];
    } else if (ingName.includes('egg')) {
      amount = 2;
      unit = 'units';
      swaps = ['scrambled tofu', 'egg whites'];
    } else if (ingName.includes('spinach') || ingName.includes('broccoli') || ingName.includes('tomato') || ingName.includes('pepper')) {
      amount = 150;
      unit = 'g';
      swaps = ['kale', 'zucchini', 'mushrooms'];
    } else if (ingName.includes('oil') || ingName.includes('butter')) {
      amount = 1;
      unit = 'tbsp';
      swaps = ['avocado oil', 'ghee', 'coconut oil'];
    }

    return {
      name: ingName,
      baseAmount: amount,
      unit: unit,
      swaps: swaps
    };
  });

  // Always append some seasonings/staples
  ingredientsList.push({ name: 'olive oil', baseAmount: 1.5, unit: 'tbsp', swaps: ['butter', 'avocado oil'] });
  ingredientsList.push({ name: 'garlic powder & herbs', baseAmount: 1, unit: 'tsp', swaps: ['fresh garlic', 'italian seasoning'] });
  ingredientsList.push({ name: 'sea salt & freshly cracked pepper', baseAmount: 1, unit: 'pinch', swaps: ['soy sauce', 'lemon juice'] });

  const steps = [
    {
      text: `Prepare your workspace. Clean, rinse, and chop the ${finalIngredients.join(', ')} into uniform bite-sized pieces.`,
      durationMinutes: 5
    },
    {
      text: `Heat ${isVegan ? 'olive oil' : 'butter or olive oil'} in a large skillet over medium-high heat. Add your primary aromatics and let them sizzle for 2 minutes.`,
      durationMinutes: 2
    },
    {
      text: `Add the remaining ${finalIngredients.filter((_, i) => i > 0).join(', ')} to the pan. Season with salt, pepper, and herbs. Cook, tossing frequently, for 8 minutes until tender and caramelized.`,
      durationMinutes: 8
    },
    {
      text: `Reduce heat to low, adjust seasonings to taste, cover the pan, and let all the flavors merge for 3 minutes.`,
      durationMinutes: 3
    },
    {
      text: `Transfer your custom ${title} to serving bowls, garnish with a splash of lemon or fresh herbs if available, and enjoy immediately.`,
      durationMinutes: 1
    }
  ];

  return {
    title: title,
    description: description,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Easy',
    servings: 2,
    nutrition: {
      calories: 380,
      protein: isVegetarian ? '12g' : '28g',
      carbs: isGlutenFree ? '35g' : '45g',
      fat: '14g'
    },
    ingredients: ingredientsList,
    steps: steps
  };
}

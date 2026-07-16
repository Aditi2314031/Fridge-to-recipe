export const mockRecipes = [
  {
    title: "Creamy Garlic Spinach & Tomato Pasta",
    description: "A rich, comforting pasta dish tossed with fresh baby spinach, juicy cherry tomatoes, and a creamy garlic-parmesan sauce. Perfect for a quick gourmet weeknight dinner.",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Easy",
    servings: 2,
    nutrition: {
      calories: 520,
      protein: "14g",
      carbs: "68g",
      fat: "22g"
    },
    ingredients: [
      { name: "penne pasta (or any pasta)", baseAmount: 200, unit: "g", swaps: ["gluten-free pasta", "zucchini noodles", "spaghetti"] },
      { name: "cherry tomatoes", baseAmount: 150, unit: "g", swaps: ["diced canned tomatoes", "sun-dried tomatoes", "bell peppers"] },
      { name: "baby spinach", baseAmount: 100, unit: "g", swaps: ["kale", "arugula", "swiss chard"] },
      { name: "heavy cream", baseAmount: 120, unit: "ml", swaps: ["coconut milk", "half-and-half", "unsweetened almond milk with 1 tbsp flour"] },
      { name: "parmesan cheese", baseAmount: 40, unit: "g", swaps: ["nutritional yeast", "pecorino romano", "vegan parmesan"] },
      { name: "garlic cloves, minced", baseAmount: 3, unit: "cloves", swaps: ["1 tsp garlic powder", "shallots"] },
      { name: "olive oil", baseAmount: 1, unit: "tbsp", swaps: ["butter", "coconut oil"] },
      { name: "salt and black pepper", baseAmount: 1, unit: "pinch", swaps: ["red pepper flakes for heat"] }
    ],
    steps: [
      {
        text: "Bring a large pot of salted water to a boil. Add the penne pasta and cook according to package instructions until al dente (about 10 minutes). Reserve 1/2 cup of pasta water, then drain.",
        durationMinutes: 10
      },
      {
        text: "While the pasta is boiling, heat olive oil in a large skillet over medium heat. Add the minced garlic and sauté until fragrant, about 1 minute.",
        durationMinutes: 1
      },
      {
        text: "Add the cherry tomatoes to the skillet. Cook, stirring occasionally, until they start to soften and burst, about 4 minutes.",
        durationMinutes: 4
      },
      {
        text: "Reduce the heat to low. Pour in the heavy cream and bring to a gentle simmer. Let it cook and reduce slightly for 3 minutes.",
        durationMinutes: 3
      },
      {
        text: "Stir in the baby spinach and grated parmesan cheese. Let the spinach wilt into the sauce, about 2 minutes.",
        durationMinutes: 2
      },
      {
        text: "Add the drained pasta to the skillet. Toss everything together until the pasta is coated in the creamy sauce. If the sauce is too thick, add a splash of the reserved pasta water. Season with salt and pepper to taste, and serve hot.",
        durationMinutes: 2
      }
    ]
  },
  {
    title: "Garlic Butter Pan-Seared Chicken",
    description: "Tender, juicy chicken breasts pan-seared to golden perfection, then basted in a rich garlic butter sauce and finished with fresh lemon juice.",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Medium",
    servings: 2,
    nutrition: {
      calories: 410,
      protein: "38g",
      carbs: "4g",
      fat: "27g"
    },
    ingredients: [
      { name: "chicken breasts", baseAmount: 2, unit: "pieces", swaps: ["chicken thighs", "pork chops", "firm tofu blocks", "seitan cutlets"] },
      { name: "garlic cloves, minced", baseAmount: 4, unit: "cloves", swaps: ["1.5 tsp garlic powder", "shallots"] },
      { name: "butter", baseAmount: 3, unit: "tbsp", swaps: ["margarine", "olive oil", "vegan butter"] },
      { name: "olive oil", baseAmount: 1, unit: "tbsp", swaps: ["avocado oil", "canola oil"] },
      { name: "lemon juice", baseAmount: 1, unit: "tbsp", swaps: ["white wine", "apple cider vinegar"] },
      { name: "parsley, chopped", baseAmount: 1, unit: "tbsp", swaps: ["cilantro", "dried parsley", "oregano"] },
      { name: "salt, pepper, and paprika", baseAmount: 1, unit: "tsp", swaps: ["cajun seasoning", "italian seasoning"] }
    ],
    steps: [
      {
        text: "Pat the chicken breasts dry with paper towels. Season both sides generously with salt, pepper, and paprika.",
        durationMinutes: 3
      },
      {
        text: "Heat olive oil and 1 tablespoon of butter in a large skillet over medium-high heat. Once hot, add the chicken breasts and sear without moving for 6 minutes to form a golden crust.",
        durationMinutes: 6
      },
      {
        text: "Flip the chicken breasts over. Add the remaining 2 tablespoons of butter and minced garlic to the pan. Cook for another 5 minutes, spooning the melted garlic butter over the chicken as it cooks.",
        durationMinutes: 5
      },
      {
        text: "Squeeze the fresh lemon juice into the pan and sprinkle with chopped parsley. Cook for 1 more minute, ensuring the internal temperature of the chicken reaches 165°F (74°C). Remove from heat, let rest for 3 minutes, then slice and serve with the pan juices.",
        durationMinutes: 4
      }
    ]
  },
  {
    title: "Classic Cheesy Garlic Omelette",
    description: "A fluffy, buttery three-egg omelette folded over melted cheddar cheese, sautéed garlic, and fresh green onions. Simple, fast, and incredibly satisfying.",
    prepTime: 5,
    cookTime: 5,
    difficulty: "Easy",
    servings: 1,
    nutrition: {
      calories: 340,
      protein: "19g",
      carbs: "3g",
      fat: "28g"
    },
    ingredients: [
      { name: "eggs", baseAmount: 3, unit: "units", swaps: ["egg whites only", "liquid egg substitute", "chickpea flour batter"] },
      { name: "cheddar cheese, shredded", baseAmount: 50, unit: "g", swaps: ["mozzarella", "swiss cheese", "vegan cheddar"] },
      { name: "garlic cloves, finely minced", baseAmount: 1, unit: "clove", swaps: ["garlic powder", "chives"] },
      { name: "milk", baseAmount: 1, unit: "tbsp", swaps: ["water", "unsweetened almond milk", "heavy cream"] },
      { name: "butter", baseAmount: 1, unit: "tbsp", swaps: ["olive oil", "cooking spray"] },
      { name: "green onions, sliced", baseAmount: 1, unit: "stalk", swaps: ["chives", "red onion", "parsley"] },
      { name: "salt and black pepper", baseAmount: 1, unit: "pinch", swaps: ["cayenne pepper"] }
    ],
    steps: [
      {
        text: "In a bowl, whisk the eggs, milk, a pinch of salt, and pepper together until fully combined and slightly frothy.",
        durationMinutes: 2
      },
      {
        text: "Melt butter in a non-stick skillet over medium-low heat. Add the minced garlic and sauté for 1 minute until soft and fragrant, being careful not to let it brown.",
        durationMinutes: 1
      },
      {
        text: "Pour the egg mixture into the skillet. Let the edges set slightly, then gently push them toward the center with a spatula, tilting the pan to let uncooked egg flow to the edges. Cook for about 2 minutes.",
        durationMinutes: 2
      },
      {
        text: "When the eggs are mostly set but still slightly wet in the center, sprinkle the shredded cheddar cheese and green onions over one half of the omelette.",
        durationMinutes: 1
      },
      {
        text: "Carefully fold the empty half of the omelette over the filling. Let it cook for another 1 minute to melt the cheese, then slide onto a plate and enjoy.",
        durationMinutes: 1
      }
    ]
  },
  {
    title: "Crispy Tofu & Broccoli Stir-Fry",
    description: "Crispy pan-fried tofu cubes and tender-crisp broccoli florets tossed in a savory, sweet garlic-ginger soy sauce. A healthy and delicious plant-based meal.",
    prepTime: 15,
    cookTime: 10,
    difficulty: "Medium",
    servings: 2,
    nutrition: {
      calories: 310,
      protein: "16g",
      carbs: "24g",
      fat: "18g"
    },
    ingredients: [
      { name: "extra-firm tofu, cubed", baseAmount: 350, unit: "g", swaps: ["chicken breasts, sliced", "beef strips", "tempeh cubes"] },
      { name: "broccoli florets", baseAmount: 200, unit: "g", swaps: ["cauliflower", "snap peas", "green beans"] },
      { name: "soy sauce (or tamari)", baseAmount: 3, unit: "tbsp", swaps: ["coconut aminos", "low-sodium soy sauce"] },
      { name: "honey", baseAmount: 1, unit: "tbsp", swaps: ["maple syrup", "brown sugar", "agave nectar"] },
      { name: "garlic cloves, minced", baseAmount: 3, unit: "cloves", swaps: ["garlic powder"] },
      { name: "fresh ginger, minced", baseAmount: 1, unit: "tsp", swaps: ["ground ginger powder"] },
      { name: "sesame oil", baseAmount: 1, unit: "tbsp", swaps: ["olive oil", "peanut oil"] },
      { name: "cornstarch", baseAmount: 1, unit: "tbsp", swaps: ["tapioca starch", "arrowroot powder"] },
      { name: "vegetable oil", baseAmount: 1, unit: "tbsp", swaps: ["canola oil", "coconut oil"] }
    ],
    steps: [
      {
        text: "Press the tofu block with paper towels and a heavy pan for 10 minutes to drain excess water. Cut into bite-sized cubes and toss gently with the cornstarch until evenly coated.",
        durationMinutes: 10
      },
      {
        text: "In a small bowl, whisk together the soy sauce, honey, sesame oil, minced ginger, minced garlic, and 2 tablespoons of water to create the stir-fry sauce.",
        durationMinutes: 2
      },
      {
        text: "Heat vegetable oil in a large skillet or wok over medium-high heat. Add the tofu cubes and fry, turning occasionally, until crispy and golden brown on all sides (about 6 minutes). Remove tofu from pan and set aside.",
        durationMinutes: 6
      },
      {
        text: "In the same skillet, add the broccoli florets and 3 tablespoons of water. Cover and steam for 3 minutes until tender-crisp.",
        durationMinutes: 3
      },
      {
        text: "Remove the cover, return the tofu to the skillet, and pour the sauce mixture over the ingredients. Toss continuously for 2 minutes until the sauce bubbles and thickens, glaze coats everything, then serve immediately.",
        durationMinutes: 2
      }
    ]
  }
];

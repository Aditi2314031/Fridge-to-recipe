import React, { useState, useEffect } from 'react';
import { generateRecipe } from './ai';
import './App.css';

// SVG Icons as React Components to avoid external image dependencies
const ChefHatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18V6a4 4 0 0 1 8 0v12"/><path d="M18 18V9a4 4 0 0 0-8 0v9"/><path d="M3 18h18"/><path d="M12 6a3 3 0 0 0-6 0v12h6V6Z"/><path d="M18 9a3 3 0 0 1 3 3v6h-6v-6a3 3 0 0 1 3-3Z"/></svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/></svg>
);

const TimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const FlameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

// Custom web audio synthesized beep sound for kitchen timers
function playTimerCompleteBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    
    const playTone = (time, freq, duration) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.4, time + 0.03);
      gain.gain.linearRampToValueAtTime(0, time + duration);
      osc.start(time);
      osc.stop(time + duration);
    };

    // Play a friendly triple-beep alarm
    playTone(now, 880, 0.15);
    playTone(now + 0.2, 880, 0.15);
    playTone(now + 0.4, 1100, 0.3);
  } catch (error) {
    console.error('Failed to play alarm beep:', error);
  }
}

// Kitchen Timer Sub-component
function KitchenTimer({ durationMinutes }) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playTimerCompleteBeep();
      alert(`Cooking timer completed! (${durationMinutes} min step is done)`);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, durationMinutes]);

  const toggleTimer = (e) => {
    e.stopPropagation();
    setIsRunning(!isRunning);
  };

  const resetTimer = (e) => {
    e.stopPropagation();
    setIsRunning(false);
    setTimeLeft(durationMinutes * 60);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="kitchen-timer" onClick={(e) => e.stopPropagation()}>
      <div className={`timer-circle ${isRunning ? 'active' : ''}`}>
        <div className="timer-display">{formatTime(timeLeft)}</div>
      </div>
      <div className="timer-controls">
        <button 
          onClick={toggleTimer} 
          className={`timer-btn ${isRunning ? '' : 'primary'}`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="timer-btn">Reset</button>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [ingredientsText, setIngredientsText] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [servings, setServings] = useState(2);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [checkedSteps, setCheckedSteps] = useState(new Set());
  const [swapsMap, setSwapsMap] = useState({}); // maps ingredientIndex -> swappedName (string)
  const [openSwaps, setOpenSwaps] = useState(new Set()); // set of ingredientIndices with open popover
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Popular Quick-select ingredients
  const popularIngredients = [
    'Chicken Breasts', 'Eggs', 'Cherry Tomatoes', 'Parmesan', 'Pasta',
    'Baby Spinach', 'Tofu', 'Broccoli', 'Garlic', 'Heavy Cream'
  ];

  // Apply Theme class to HTML node
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleQuickAdd = (item) => {
    if (!ingredientsText.toLowerCase().includes(item.toLowerCase())) {
      setIngredientsText((prev) => {
        const trimmed = prev.trim();
        if (!trimmed) return item;
        if (trimmed.endsWith(',')) return `${trimmed} ${item}`;
        return `${trimmed}, ${item}`;
      });
    }
  };

  const handlePreferenceToggle = (pref) => {
    setPreferences((prev) => 
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleIngredientCheck = (idx) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const handleStepCheck = (idx) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const toggleSwapPopover = (idx, e) => {
    e.stopPropagation();
    setOpenSwaps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.clear(); // close others
        next.add(idx);
      }
      return next;
    });
  };

  const handleSwapSelect = (idx, swapName) => {
    setSwapsMap((prev) => ({
      ...prev,
      [idx]: swapName
    }));
    setOpenSwaps((prev) => {
      const next = new Set(prev);
      next.delete(idx);
      return next;
    });
  };

  const handleUndoSwap = (idx, e) => {
    e.stopPropagation();
    setSwapsMap((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
  };

  const saveApiKey = (newKey) => {
    localStorage.setItem('gemini_api_key', newKey);
    setApiKey(newKey);
    setIsSettingsOpen(false);
  };

  const handleGenerate = async () => {
    if (!ingredientsText.trim()) return;

    setLoading(true);
    setRecipe(null);
    setCheckedIngredients(new Set());
    setCheckedSteps(new Set());
    setSwapsMap({});
    setOpenSwaps(new Set());

    try {
      const hasKey = !!apiKey.trim();
      const generated = await generateRecipe(ingredientsText, preferences, apiKey, !hasKey);
      setRecipe(generated);
      setServings(generated.servings || 2);
    } catch (error) {
      console.error(error);
      alert('An error occurred during recipe generation.');
    } finally {
      setLoading(false);
    }
  };

  // Close swap popovers when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenSwaps(new Set());
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="app-container">
      {/* Header section */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">
            <ChefHatIcon />
          </div>
          <h1 className="logo-text">Gusto</h1>
        </div>

        <div className="header-controls">
          <div 
            className={`api-badge ${apiKey.trim() ? 'connected' : 'demo'}`} 
            onClick={() => setIsSettingsOpen(true)}
            title="Configure Gemini API Settings"
          >
            <span className="dot">●</span>
            {apiKey.trim() ? 'Gemini AI Connected' : 'Try Demo Mode'}
          </div>

          <button onClick={toggleTheme} className="icon-btn" title="Toggle Light/Dark Theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <button onClick={() => setIsSettingsOpen(true)} className="icon-btn" title="Settings">
            <SettingsIcon />
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="workspace-grid">
        {/* Left Input Sidebar */}
        <section className="panel-card">
          <h2 className="panel-title">
            <SparklesIcon /> What's in your fridge?
          </h2>

          <div className="form-group">
            <label className="form-label" htmlFor="ingredients-input">
              Enter your ingredients, separated by commas:
            </label>
            <textarea
              id="ingredients-input"
              className="text-area-input"
              placeholder="e.g. Chicken breast, baby spinach, garlic, heavy cream..."
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="chips-label">Quick Add Common Ingredients:</div>
            <div className="chips-container">
              {popularIngredients.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="chip"
                  onClick={() => handleQuickAdd(item)}
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Dietary Restrictions:</label>
            <div className="preference-grid">
              {['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Keto'].map((pref) => (
                <div key={pref}>
                  <input
                    type="checkbox"
                    id={`pref-${pref}`}
                    className="preference-checkbox"
                    checked={preferences.includes(pref)}
                    onChange={() => handlePreferenceToggle(pref)}
                  />
                  <label htmlFor={`pref-${pref}`} className="preference-label">
                    {pref}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !ingredientsText.trim()}
            className="btn-primary"
          >
            {loading ? 'Thinking...' : 'Generate Recipe'}
          </button>
        </section>

        {/* Right Recipe Output */}
        <section className="recipe-content-container">
          {loading && (
            <div className="panel-card loading-card">
              <div className="spinner"></div>
              <h3>Curating Your Recipe...</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                AI is compiling culinary steps, scaling ingredients, and finding substitutes.
              </p>
              <div className="shimmer-text"></div>
              <div className="shimmer-text short"></div>
            </div>
          )}

          {!loading && !recipe && (
            <div className="placeholder-card">
              <div className="placeholder-icon">🍲</div>
              <h3>Your Culinary Sandbox</h3>
              <p>Add some ingredients on the left side and press "Generate Recipe" to cook up something amazing.</p>
            </div>
          )}

          {!loading && recipe && (
            <div className="panel-card recipe-card">
              {recipe.fallbackNote && (
                <div className="fallback-alert">
                  <span>⚠️</span> {recipe.fallbackNote}
                </div>
              )}

              {/* Recipe Meta */}
              <div className="recipe-header">
                <h2 className="recipe-title">{recipe.title}</h2>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-meta-grid">
                  <div className="meta-badge">
                    <span className="meta-label">Prep Time</span>
                    <span className="meta-value">
                      <TimeIcon /> {recipe.prepTime}m
                    </span>
                  </div>
                  <div className="meta-badge">
                    <span className="meta-label">Cook Time</span>
                    <span className="meta-value">
                      <TimeIcon /> {recipe.cookTime}m
                    </span>
                  </div>
                  <div className="meta-badge">
                    <span className="meta-label">Difficulty</span>
                    <span className="meta-value">
                      <AwardIcon /> {recipe.difficulty}
                    </span>
                  </div>
                  <div className="meta-badge">
                    <span className="meta-label">Total Time</span>
                    <span className="meta-value">
                      {(recipe.prepTime || 0) + (recipe.cookTime || 0)}m
                    </span>
                  </div>
                </div>
              </div>

              {/* Nutrition */}
              {recipe.nutrition && (
                <div className="nutrition-section">
                  <h3 className="nutrition-title">Estimated Nutrition Facts</h3>
                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <div className="nutrition-val">{recipe.nutrition.calories}</div>
                      <div className="nutrition-label">Calories</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-val">{recipe.nutrition.protein}</div>
                      <div className="nutrition-label">Protein</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-val">{recipe.nutrition.carbs}</div>
                      <div className="nutrition-label">Carbohydrates</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-val">{recipe.nutrition.fat}</div>
                      <div className="nutrition-label">Fats</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scalable Servings Controls */}
              <div className="servings-control">
                <div className="servings-info">
                  <span className="servings-title">Adjust Servings</span>
                  <span className="servings-scale-text">Quantities scale automatically</span>
                </div>
                <div className="stepper">
                  <button 
                    disabled={servings <= 1} 
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="stepper-btn"
                  >
                    -
                  </button>
                  <span className="stepper-val">{servings}</span>
                  <button 
                    onClick={() => setServings(servings + 1)}
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 className="recipe-section-title">Ingredients Checklist</h3>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ing, idx) => {
                    const ratio = servings / (recipe.servings || 2);
                    const scaledAmount = ing.baseAmount 
                      ? Math.round(ing.baseAmount * ratio * 100) / 100 
                      : null;
                    const isChecked = checkedIngredients.has(idx);
                    const isSwapped = swapsMap[idx] !== undefined;
                    const activeName = isSwapped ? swapsMap[idx] : ing.name;

                    return (
                      <li key={idx} className={`ingredient-item ${isChecked ? 'checked' : ''}`}>
                        <div className="ingredient-left" onClick={() => handleIngredientCheck(idx)}>
                          <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} />
                          <span className="ingredient-name">
                            {activeName} 
                            {isSwapped && (
                              <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginLeft: '0.5rem' }}>
                                (Swaps: {ing.name})
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="ingredient-right" onClick={(e) => e.stopPropagation()}>
                          {scaledAmount && (
                            <span className="ingredient-qty">
                              {scaledAmount} {ing.unit}
                            </span>
                          )}

                          <div style={{ position: 'relative' }}>
                            {!isSwapped ? (
                              ing.swaps && ing.swaps.length > 0 && (
                                <button 
                                  onClick={(e) => toggleSwapPopover(idx, e)}
                                  className="swap-trigger"
                                >
                                  Swap
                                </button>
                              )
                            ) : (
                              <button 
                                onClick={(e) => handleUndoSwap(idx, e)} 
                                className="swap-trigger" 
                                style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
                              >
                                Undo
                              </button>
                            )}

                            {openSwaps.has(idx) && (
                              <div className="swap-popover" style={{ position: 'absolute', right: 0, zIndex: 10 }}>
                                <div className="swap-popover-title">Swap Options</div>
                                {ing.swaps.map((alt) => (
                                  <button 
                                    key={alt}
                                    className="swap-option-btn"
                                    onClick={() => handleSwapSelect(idx, alt)}
                                  >
                                    {alt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Cooking Steps Checklist with Timers */}
              <div>
                <h3 className="recipe-section-title">Preparation Steps</h3>
                
                {/* Steps Completion Progress Bar */}
                <div className="progress-container">
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${recipe.steps.length ? (checkedSteps.size / recipe.steps.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    {Math.round(recipe.steps.length ? (checkedSteps.size / recipe.steps.length) * 100 : 0)}%
                  </span>
                </div>

                <div className="steps-list">
                  {recipe.steps.map((step, idx) => {
                    const isStepCompleted = checkedSteps.has(idx);
                    
                    // Determine if this step is the "active" step (first uncompleted step)
                    let isActiveStep = false;
                    const sortedUncompleted = Array.from({ length: recipe.steps.length })
                      .map((_, i) => i)
                      .filter((i) => !checkedSteps.has(i));
                    if (sortedUncompleted.length > 0 && sortedUncompleted[0] === idx) {
                      isActiveStep = true;
                    }

                    return (
                      <div 
                        key={idx} 
                        className={`step-card ${isStepCompleted ? 'completed' : ''} ${isActiveStep ? 'active' : ''}`}
                      >
                        <div className="step-top">
                          <div className="step-number">{idx + 1}</div>
                          <span className="step-text">{step.text}</span>
                          <button
                            onClick={() => handleStepCheck(idx)}
                            className={`step-check-btn ${isStepCompleted ? 'completed' : ''}`}
                          >
                            {isStepCompleted ? '✓ Done' : 'Complete'}
                          </button>
                        </div>

                        {step.durationMinutes && !isStepCompleted && (
                          <KitchenTimer durationMinutes={step.durationMinutes} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Settings Modal (Gemini Config) */}
      {isSettingsOpen && (
        <div className="modal-overlay" onClick={() => setIsSettingsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">API Settings</h3>
              <button className="modal-close" onClick={() => setIsSettingsOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Enter your Google AI Studio Gemini API Key below. Your key is stored locally in your browser's Local Storage and never leaves your machine.
              </p>
              
              <div className="form-group">
                <label className="form-label" htmlFor="api-key-input">Gemini API Key:</label>
                <input
                  type="password"
                  id="api-key-input"
                  className="input-text"
                  placeholder="AIzaSy..."
                  defaultValue={apiKey}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    const val = document.getElementById('api-key-input').value;
                    saveApiKey(val);
                  }}
                >
                  Save API Key
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    saveApiKey('');
                  }}
                >
                  Use Demo Mode
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <a 
                  href="https://aistudio.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--color-accent)', fontSize: '0.8rem', textDecoration: 'none' }}
                >
                  Get a free Gemini API Key →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

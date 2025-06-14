import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7044/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('API error:', err));
  }, []);

  const scrollToRecipe = (id) => {
    document.getElementById(`recipe-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <h1 className="header">Japanese Food Guide Recipe</h1>

      <div className="recipe-picking-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="pick-card" onClick={() => scrollToRecipe(recipe.id)}>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <p>{recipe.title}</p>
          </div>
        ))}
      </div>

      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} id={`recipe-${recipe.id}`} className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

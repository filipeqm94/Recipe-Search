import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataContext';

export default function SearchResults() {
  const { recipes, handleClick } = useContext(DataContext);

  if (!recipes) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      {recipes.hits
        .sort((a, b) => a.recipe.calories - b.recipe.calories)
        .map(({ recipe }, index) => {
          return (
            <Link
              to={`/recipe/${recipe.label.toLowerCase()}`}
              onClick={() => handleClick(recipe)}
              key={index}
            >
              <h1>{recipe.label} </h1>
              <img
                src={
                  recipe.images.SMALL
                    ? recipe.images.SMALL.url
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFRNqBzy3DZlfFl70XxQG1kZiaCPfntvY1w&usqp=CAU'
                }
                alt={recipe.label}
              />
              {recipe.totalTime ? (
                <p>
                  <small>Average prep time: {recipe.totalTime} minutes</small>
                </p>
              ) : null}
              <small style={{ display: 'block' }}>
                Calories: {recipe.calories.toFixed(2)}
              </small>
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredientLines.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </Link>
          );
        })}
    </div>
  );
}

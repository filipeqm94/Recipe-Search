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
      {recipes.hits.map(({ recipe }, index) => {
        return (
          <Link
            to={`/recipe/${recipe.label.toLowerCase()}`}
            onClick={() => handleClick(recipe)}
            key={index}
          >
            <img
              src={recipe.images.SMALL.url ? recipe.images.SMALL.url : null}
              alt={recipe.label}
            />
            <h1>{recipe.label} </h1>
            {recipe.totalTime ? (
              <small>Preparation Time: {recipe.totalTime} minutes</small>
            ) : null}

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

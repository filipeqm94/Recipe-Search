import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';

export default function SearchResults() {
  const { recipes } = useContext(DataContext);
  return (
    <div>
      {recipes.hits.map(({ recipe }, index) => {
        return (
          <div key={index}>
            <img src={recipe.images.SMALL.url} alt={recipe.label} />
            <h1>{recipe.label} </h1>
            {recipe.totalTime ? (
              <small>Preparation Time: {recipe.totalTime} minutes</small>
            ) : null}

            <ul>
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>
              Instrctions:{' '}
              <a href={recipe.url} target='_blank' rel='noreferrer'>
                {recipe.source}
              </a>
            </h3>
          </div>
        );
      })}
    </div>
  );
}

import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';

export default function Recipe() {
  const { recipe } = useContext(DataContext);
  return (
    <div>
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
        Instruction at:{' '}
        <a href={recipe.url} target=' _blank'>
          {recipe.source}
        </a>
      </h3>
    </div>
  );
}

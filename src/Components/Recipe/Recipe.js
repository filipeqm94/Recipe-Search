import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';

import { Card, Container } from 'react-bootstrap';

export default function Recipe() {
  const { recipe } = useContext(DataContext);

  if (!recipe) {
    return <h1>Loading</h1>;
  }

  const currentRecipe = recipe.recipe;
  return (
    <Container>
      <Card className='h-100 overflow-auto text-center p-3'>
        <Card.Title>{currentRecipe.label}</Card.Title>
        <Card.Img
          className='rounded mx-auto d-block'
          src={
            currentRecipe.images.SMALL
              ? currentRecipe.images.SMALL.url
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFRNqBzy3DZlfFl70XxQG1kZiaCPfntvY1w&usqp=CAU'
          }
          alt={currentRecipe.label}
          style={{ width: 200, height: 200 }}
        />
        {currentRecipe.totalTime ? (
          <small className='d-block'>
            Average prep time: {currentRecipe.totalTime} minutes.
          </small>
        ) : null}
        <small className='d-block'>{currentRecipe.yield} servings.</small>
        <small className='d-block'>
          Calories per serving:{' '}
          {(+currentRecipe.calories / +currentRecipe.yield).toFixed(2)}
        </small>
        <h5 className='mt-4'>Ingredients:</h5>
        <ul className='list-group'>
          {currentRecipe.ingredientLines.map((ingredient, index) => (
            <li className='list-group-item' key={index}>
              {ingredient}
            </li>
          ))}
        </ul>
        <h1>
          Instructions can be found at:{' '}
          <a href={currentRecipe.url} target=' _blank'>
            {currentRecipe.source}
          </a>
        </h1>
      </Card>
    </Container>
  );
}

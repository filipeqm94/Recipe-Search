import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataContext';

//style
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';

import noImage from '../../assets/no-image.jpeg';

export default function SearchResults() {
  const { recipes, handleClick } = useContext(DataContext);

  if (!recipes) {
    return (
      <div className='d-flex justify-content-center'>
        <h1>Loading...</h1>
      </div>
    );
  } else if (recipes.hits.length === 0) {
    return (
      <div className='d-flex justify-content-center'>
        <Alert variant='danger'>
          No recipes found when searching for the parameters entered. Please try
          something else.
        </Alert>
      </div>
    );
  }

  return (
    <Container className='mt-3'>
      <Row>
        {recipes.hits.map(({ recipe, _links }, index) => {
          return (
            <Col className='colHeight mb-5' key={index}>
              <Card
                className='h-100 overflow-auto text-center p-3'
                style={{ minWidth: 250 }}
              >
                <Link
                  to={`/recipe/${recipe.label.toLowerCase()}`}
                  onClick={() => handleClick(_links.self.href)}
                >
                  <Card.Title>{recipe.label}</Card.Title>
                  <Card.Img
                    src={
                      recipe.images.SMALL ? recipe.images.SMALL.url : noImage
                    }
                    alt={recipe.label}
                    style={{ width: 200, height: 'auto' }}
                  />
                  {recipe.totalTime ? (
                    <small className='d-block'>
                      Average prep time: {recipe.totalTime} minutes.
                    </small>
                  ) : null}
                  <small className='d-block'>{recipe.yield} servings.</small>
                  <small className='d-block'>
                    Calories per serving:{' '}
                    {(+recipe.calories / +recipe.yield).toFixed(2)}
                  </small>
                  <h5>Ingredients:</h5>
                  <ul>
                    {recipe.ingredientLines.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

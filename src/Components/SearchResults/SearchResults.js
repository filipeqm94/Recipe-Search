import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataContext';

//style
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function SearchResults() {
  const { recipes, handleClick } = useContext(DataContext);

  if (!recipes) {
    return <h1>Loading</h1>;
  }

  return (
    <Container className='mt-3'>
      <Row className='mb-5'>
        {recipes.hits.map(({ recipe, _links }, index) => {
          return (
            <Col className='colHeight mb-5' key={index}>
              <Card className='h-100 overflow-auto text-center p-3'>
                <Link
                  to={`/recipe/${recipe.label.toLowerCase()}`}
                  onClick={() => handleClick(_links.self.href)}
                >
                  <Card.Title>{recipe.label}</Card.Title>
                  <Card.Img
                    src={
                      recipe.images.SMALL
                        ? recipe.images.SMALL.url
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFRNqBzy3DZlfFl70XxQG1kZiaCPfntvY1w&usqp=CAU'
                    }
                    alt={recipe.label}
                    style={{ width: 200, height: 200 }}
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

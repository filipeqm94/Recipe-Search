import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';

//styles
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Filter() {
  const { handleSubmit, handleChange } = useContext(DataContext);
  return (
    //add boostrap container component and form component inside
    <Container>
      <Form onSubmit={handleSubmit} className='bg-warning text-dark w-100 p-2'>
        <Row>
          <Col className='col-md-12'>
            <Form.Group>
              <Form.Label htmlFor='ingredients'>
                Please enter recipe name or ingredients:
              </Form.Label>
              <Form.Control
                size='sm'
                type='text'
                id='ingredients'
                name='ingredients'
                placeholder='Enter ingredients here'
                required
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className='col-md-6'>
            <Form.Group>
              <Form.Label>Diet:</Form.Label>
              <Form.Check
                type='checkbox'
                label='Balanced'
                name='diet'
                id='balanced'
                value='balanced'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                label='High Fiber'
                name='diet'
                id='high-fiber'
                value='high-fiber'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                label='High Protein'
                name='diet'
                id='high-protein'
                value='high-protein'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                label='Low Fat'
                name='diet'
                id='low-fat'
                value='low-fat'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                label='Low Sodium'
                name='diet'
                id='low-sodium'
                value='low-sodium'
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col className='col-md-6'>
            <Form.Group>
              <Form.Label>Health:</Form.Label>
              <Form.Check
                type='checkbox'
                id='vegan'
                label='Vegan'
                name='health'
                value='vegan'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                id='vegetarian'
                label='Vegetarian'
                name='health'
                value='vegetarian'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                id='nut-free'
                label='Nut Free'
                name='health'
                value='tree-nut-free'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                id='egg-free'
                label='Egg Free'
                name='health'
                value='egg-free'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                id='fish-free'
                label='Fish Free'
                name='health'
                value='fish-free'
                onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                id='crustacean-free'
                label='Crustacean Free'
                name='health'
                value='crustacean-free'
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className='col-md-6'>
            <Form.Label>Calories:</Form.Label>
            <Form.Group>
              <Row>
                <Form.Label column='sm' lg={2} htmlFor='calMin'>
                  Min.:
                </Form.Label>
                <Col>
                  <Form.Control
                    size='sm'
                    type='number'
                    id='calMin'
                    name='calories'
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Form.Label column='sm' lg={2} htmlFor='calMax'>
                  Max.:
                </Form.Label>
                <Col>
                  <Form.Control
                    size='sm'
                    type='number'
                    id='calMax'
                    name='calories'
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group></Form.Group>
          </Col>
          <Col className='col-md-6'>
            <Form.Label>Prep Time:</Form.Label>
            <Form.Group>
              <Row>
                <Form.Label column='sm' lg={2} htmlFor='timeMin'>
                  Min.:
                </Form.Label>
                <Col>
                  <Form.Control
                    size='sm'
                    type='number'
                    id='timeMin'
                    name='time'
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Form.Label column='sm' lg={2} htmlFor='timeMax'>
                  Max.:
                </Form.Label>
                <Col>
                  <Form.Control
                    size='sm'
                    type='number'
                    id='timeMax'
                    name='time'
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <div className='d-flex justify-content-center'>
          <Button type='submit' className='btn-primary mt-3'>
            Search
          </Button>
        </div>
      </Form>
    </Container>
  );
}

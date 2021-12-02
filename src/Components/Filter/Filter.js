import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';

export default function Filter() {
  const { handleSubmit, handleCheckBoxChange } = useContext(DataContext);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='ingredients'>
          <h3>Ingredients:</h3>
        </label>
        <input
          type='text'
          name='ingredients'
          id='ingredients'
          placeholder='Enter ingredients here'
        />
      </div>
      <div>
        <h3>Diet:</h3>
        <div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='balanced'
              id='balanced'
              onChange={handleCheckBoxChange}
            />
            <label htmlFor='balanced'> Balanced</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='high-fiber'
              id='high-fiber'
              onChange={handleCheckBoxChange}
            />
            <label htmlFor='high-fiber'> High Fiber</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='high-protein'
              id='high-protein'
              onChange={handleCheckBoxChange}
            />
            <label htmlFor='high-protein'> High Protein</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='low-carb'
              id='low-carb'
              onChange={handleCheckBoxChange}
            />
            <label htmlFor='low-carb'> Low Carb</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='low-fat'
              id='low-fat'
              onChange={handleCheckBoxChange}
            />
            <label htmlFor='low-fat'> Low Fat</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='low-sodium'
              id='low-sodium'
              onChange={handleCheckBoxChange}
            />
            <label htmlFor='low-sodium'> Low Sodium</label>
          </div>
        </div>
      </div>
      <div>
        <h3>Health:</h3>
        <div>
          <div>
            <input />
            <label></label>
          </div>
        </div>
      </div>
      <button type='submit'>Search</button>
    </form>
  );
}

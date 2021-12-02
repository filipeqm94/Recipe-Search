import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';

export default function Filter() {
  const { handleSubmit, handleChange } = useContext(DataContext);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='ingredients'>
          <h3>Please enter recipe name or ingredients:</h3>
        </label>
        <input
          type='text'
          id='ingredients'
          name='ingredients'
          placeholder='Enter ingredients here'
          required
          onChange={handleChange}
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
              onChange={handleChange}
            />
            <label htmlFor='balanced'> Balanced</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='high-fiber'
              id='high-fiber'
              onChange={handleChange}
            />
            <label htmlFor='high-fiber'> High Fiber</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='high-protein'
              id='high-protein'
              onChange={handleChange}
            />
            <label htmlFor='high-protein'> High Protein</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='low-carb'
              id='low-carb'
              onChange={handleChange}
            />
            <label htmlFor='low-carb'> Low Carb</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='low-fat'
              id='low-fat'
              onChange={handleChange}
            />
            <label htmlFor='low-fat'> Low Fat</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='diet'
              value='low-sodium'
              id='low-sodium'
              onChange={handleChange}
            />
            <label htmlFor='low-sodium'> Low Sodium</label>
          </div>
        </div>
      </div>
      <div>
        <h3>Health:</h3>
        <div>
          <div>
            <input
              type='checkbox'
              name='health'
              value='vegan'
              id='vegan'
              onChange={handleChange}
            />
            <label htmlFor='vegan'> Vegan</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='health'
              value='vegetarian'
              id='vegetarian'
              onChange={handleChange}
            />
            <label htmlFor='vegetarian'> Vegetarian</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='health'
              value='tree-nut-free'
              id='tree-nut-free'
              onChange={handleChange}
            />
            <label htmlFor='tree-nut-free'> Nut Free</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='health'
              value='fish-free'
              id='fish-free'
              onChange={handleChange}
            />
            <label htmlFor='fish-free'> Fish Free</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='health'
              value='crustacean-free'
              id='crustacean-free'
              onChange={handleChange}
            />
            <label htmlFor='crustacean-free'> Crustacean Free</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='health'
              value='egg-free'
              id='egg-free'
              onChange={handleChange}
            />
            <label htmlFor='egg-free'> Egg Free</label>
          </div>
        </div>
      </div>
      <button type='submit'>Search</button>
    </form>
  );
}

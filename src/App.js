import React, { useState } from 'react';
import { DataContext } from './DataContext';
// import { Route } from 'react-router';

import { response } from './response';

import Header from './Components/Header/Header';
import SearchResults from './Components/SearchResults/SearchResults';
import Filter from './Components/Filter/Filter';

const app_id = process.env.APP_ID;
const api_key = process.env.API_KEY;
const query = 'eggs lettuce tomato'.replaceAll(' ', '%20');
const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${api_key}`;

console.log(url);

const initialForm = {
  ingredients: [],
  diet: [],
  health: [],
  cuisineType: [],
  mealType: [],
  dishType: [],
  calories: '',
  time: '',
};

function App() {
  const [recipes, setRecipes] = useState(response);
  const [formState, setFormState] = useState(initialForm);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('form submitted');
  };

  const handleCheckBoxChange = ({ target }) => {
    if (target.checked) {
      setFormState(state => ({
        ...state,
        diet: [...state.diet, target.value],
      }));
    } else {
      const newDiet = formState.diet;
      const index = formState.diet.indexOf(target.value);

      if (index > -1) {
        newDiet.splice(index, 1);
      }

      setFormState(state => ({
        ...state,
        diet: newDiet,
      }));
    }
  };

  // useEffect(() => {
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => setState(data))
  //     .catch(err => console.error(err));
  // }, []);

  return (
    <div>
      {JSON.stringify(formState, null, 2)}
      <Header />
      <DataContext.Provider
        value={{ recipes, setRecipes, handleSubmit, handleCheckBoxChange }}
      >
        <Filter />
        <SearchResults />
      </DataContext.Provider>
    </div>
  );
}

export default App;

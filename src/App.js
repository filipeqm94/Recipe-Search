import React, { useState } from 'react';
import { DataContext } from './DataContext';
// import { Route } from 'react-router';

import { response } from './response';

import Header from './Components/Header/Header';
import SearchResults from './Components/SearchResults/SearchResults';
import Filter from './Components/Filter/Filter';

const app_id = process.env.REACT_APP_EDAMAN_APP_ID;
const api_key = process.env.REACT_APP_EDAMAN_API_KEY;

console.log(api_key, app_id);

const initialForm = {
  ingredients: '',
  diet: [],
  health: [],
  calories: {
    calMin: 0,
    calMax: 0,
  },
  time: {
    timeMin: 0,
    timeMax: 0,
  },
};

function App() {
  const [recipes, setRecipes] = useState(response);
  const [formState, setFormState] = useState(initialForm);

  const handleSubmit = event => {
    event.preventDefault();

    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${formState.ingredients}&app_id=${app_id}&app_key=${api_key}`;

    Object.keys(formState).map(key => {
      if (key === 'diet' || key === 'health') {
        if (formState[key].length) {
          formState[key].forEach(item => {
            const newUrl = url + `&${key}=${item}`;
            url = newUrl;
          });
        }
      } else if (key === 'calories' || key === 'time') {
        return null;
      }
      return null;
    });

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
      })
      .catch(err => console.error(err));
  };

  const handleChange = ({ target }) => {
    switch (target.name) {
      case 'ingredients':
        setFormState(state => ({
          ...state,
          ingredients: target.value
            .trim()
            //remove special characters
            .replaceAll(/[&/\\#+()$^~!%.'`;=":_@*?<>{}]/g, '')
            //replace , with space
            .replaceAll(',', ' ')
            //replace multiple spaces in a row to just 1 space
            .replaceAll(/ {1,}/g, ' ')
            //replace space to match query
            .replaceAll(' ', '%20'),
        }));
        break;

      case 'diet':
        updateCheckbox(target);
        break;

      case 'health':
        updateCheckbox(target);
        break;

      case 'time':
        updateMinMax(target);
        break;

      case 'calories':
        updateMinMax(target);
        break;

      default:
        console.log('something went wrong', target);
    }
  };

  function updateCheckbox(target) {
    if (target.checked) {
      setFormState(state => ({
        ...state,
        [target.name]: [...state[target.name], target.value],
      }));
    } else {
      const newArray = formState[target.name];
      const index = formState[target.name].indexOf(target.value);

      if (index > -1) {
        newArray.splice(index, 1);
      }

      setFormState(state => ({
        ...state,
        [target.name]: newArray,
      }));
    }
  }

  function updateMinMax(target) {
    setFormState(state => ({
      ...state,
      [target.name]: {
        ...state[target.name],
        [target.id]: target.value,
      },
    }));
  }

  return (
    <div>
      {JSON.stringify(formState, null, 2)}
      <Header />
      <DataContext.Provider
        value={{
          recipes,
          setRecipes,
          formState,
          setFormState,
          handleSubmit,
          handleChange,
        }}
      >
        <Filter />
        <SearchResults />
      </DataContext.Provider>
    </div>
  );
}

export default App;

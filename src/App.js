import React, { useState, useEffect } from 'react';
import { DataContext } from './DataContext';
import { Route } from 'react-router';

import Header from './Components/Header/Header';
import SearchResults from './Components/SearchResults/SearchResults';
import Recipe from './Components/Recipe/Recipe';
import Footer from './Components/Footer/Footer';

const app_id = process.env.REACT_APP_EDAMAN_APP_ID;
const api_key = process.env.REACT_APP_EDAMAN_API_KEY;

const initialForm = {
  ingredients: '',
  diet: [],
  health: [],
  calories: {
    min: 0,
    max: 0,
  },
  time: {
    min: 0,
    max: 0,
  },
};

const randomRecipes = `https://api.edamam.com/api/recipes/v2?type=public&q=garlic&app_id=${app_id}&app_key=${api_key}&random=true`;

function App() {
  const [recipes, setRecipes] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [formState, setFormState] = useState(initialForm);

  useEffect(() => {
    fetch(randomRecipes)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch(recipeUrl)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(err => console.error(err));
  }, [recipeUrl]);

  const handleSubmit = event => {
    event.preventDefault();

    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${formState.ingredients}&app_id=${app_id}&app_key=${api_key}`;

    Object.keys(formState).map(key => {
      if (key === 'diet' || key === 'health') {
        if (formState[key].length) {
          formState[key].forEach(item => {
            const urlQuery = url + `&${key}=${item}`;
            url = urlQuery;
          });
        }
      } else if (key === 'calories' || key === 'time') {
        let min = formState[key].min;
        let max = formState[key].max;

        if (!min && !max) {
          return null;
        }

        if (min === 0) {
          const urlQuery = url + `&${key}=${max}`;
          url = urlQuery;
        } else if (max === 0) {
          const urlQuery = url + `&${key}=${min}%2B`;
          url = urlQuery;
        } else {
          const urlQuery =
            url + `&${key}=${Math.min(min, max)}-${Math.max(min, max)}`;
          url = urlQuery;
        }
      }
      return null;
    });

    fetch(url)
      .then(res => res.json())
      .then(data => setRecipes(data))
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

  const handleClick = recipeLink => {
    setRecipeUrl(recipeLink);
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
        [target.id.includes('Min') ? 'min' : 'max']:
          +target.value >= 0 ? +target.value : 0,
      },
    }));
  }

  return (
    <>
      <DataContext.Provider
        value={{
          recipes,
          recipe,
          handleSubmit,
          handleChange,
          handleClick,
        }}
      >
        <Header />
        <main>
          <Route exact path='/' component={SearchResults} />
          <Route path='/recipe/:recipe' render={() => <Recipe />} />
        </main>
        <div
          style={{
            display: 'block',
            padding: '20px',
            height: '60px',
            width: '100%',
          }}
        ></div>
      </DataContext.Provider>
      <Footer />
    </>
  );
}

export default App;

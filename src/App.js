import React, { useState, useEffect } from 'react';
import { DataContext } from './DataContext';
import { Route } from 'react-router';

//components
import Header from './Components/Header/Header';
import SearchResults from './Components/SearchResults/SearchResults';
import Recipe from './Components/Recipe/Recipe';
import Footer from './Components/Footer/Footer';

//app id and key
const app_id = process.env.REACT_APP_EDAMAN_APP_ID;
const api_key = process.env.REACT_APP_EDAMAN_API_KEY;

//initial form state
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

//random recipes url
const randomRecipes = `https://api.edamam.com/api/recipes/v2?type=public&q=garlic&app_id=${app_id}&app_key=${api_key}&random=true`;

function App() {
  //states
  const [recipes, setRecipes] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [formState, setFormState] = useState(initialForm);

  //load random recipes when page is loaded
  useEffect(() => {
    fetch(randomRecipes)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, []);

  //call useEffect to change recipe everytime recipeUrl is updated
  useEffect(() => {
    fetch(recipeUrl)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(err => console.error(err));
  }, [recipeUrl]);

  //where the mgic happens
  const handleSubmit = event => {
    event.preventDefault();

    //primary url to be used on api call
    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${formState.ingredients}&app_id=${app_id}&app_key=${api_key}`;

    //turn object keys into an array and iterate through every key in the array
    Object.keys(formState).map(key => {
      /*if the key is equal to diet or health set them to their respective
      queries as shown in the api documentation */
      if (key === 'diet' || key === 'health') {
        /* if this particular key is not false (zero) add the value of the key
        to the url query*/
        if (formState[key].length) {
          formState[key].forEach(item => {
            const urlQuery = url + `&${key}=${item}`;
            url = urlQuery;
          });
        }
        /*do the same thing for calories and time since they share the same
        query formating*/
      } else if (key === 'calories' || key === 'time') {
        let min = formState[key].min;
        let max = formState[key].max;

        /*no need to add it if they are 0 - their default value*/
        if (!min && !max) {
          return null;
        }

        //if min is 0 just send the max
        //if max is 0 just send min+ (%2B is the code for +)
        //otherwise send the smallest value - the highest value
        if (min === 0) {
          const urlQuery = url + `&${key}=${max}`;
          url = urlQuery;
        } else if (max === 0) {
          const urlQuery = url + `&${key}=${min}%2B`;
          url = urlQuery;
        } else {
          const urlQuery =
            //did this to prevent smarty pants from sending min higher than max
            url + `&${key}=${Math.min(min, max)}-${Math.max(min, max)}`;
          url = urlQuery;
        }
      }
      //return null so react shuts up about it
      return null;
    });

    //classic api call
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        //reset form state after successful API response
        setFormState(initialForm);
      })
      .catch(err => console.error(err));
  };

  //more magic happening
  const handleChange = ({ target }) => {
    //i wanted to switch things up a bit 😜
    switch (target.name) {
      case 'ingredients':
        setFormState(state => ({
          //destruct obj and change the ingredients key
          ...state,
          ingredients: target.value
            //remove excesive white space around it
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
        //i dont think this is the best way to go about a default statement...
        console.log('something went wrong', target);
    }
  };

  /*just update recipe link... thats it... useEffect will do all the magic...
  this jsut triggers useEffect...*/
  const handleClick = recipeLink => {
    setRecipeUrl(recipeLink);
  };

  //update checkboxes!
  function updateCheckbox(target) {
    //if target is checked add it to its respective array in the formState obj
    //if unchecked remove it
    if (target.checked) {
      setFormState(state => ({
        ...state,
        [target.name]: [...state[target.name], target.value],
      }));
    } else {
      //create a copy of formState key
      const newArray = formState[target.name];
      //find the index of the unchecked box
      const index = formState[target.name].indexOf(target.value);

      //if it exists, take it out
      if (index > -1) {
        newArray.splice(index, 1);
      }

      //set the newArray to the new formState key
      setFormState(state => ({
        ...state,
        [target.name]: newArray,
      }));
    }
  }

  //updating min and max
  function updateMinMax(target) {
    setFormState(state => ({
      //destructure state
      ...state,
      //access key being changed
      [target.name]: {
        //destructure that too, you only want to change one of them
        ...state[target.name],
        //if the name has Min on it, change min, otherwise, change max
        [target.id.includes('Min') ? 'min' : 'max']:
          //make sure the value is either greater or equal to 0
          +target.value >= 0 ? +target.value : 0,
        /*is it a good idea to use this mafic + operator to make strings
          become numbers? in this case i know the input will come from a 
          tyoe='number'*/
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
        {/* phantom div to make sure nothing gets clipped by sticky footer*/}
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

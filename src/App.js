import React, {useEffect, useState} from 'react'
import './App.css'
import Recipe from './Recipe'
import { FormControl, Input, Button } from '@material-ui/core';

const App = () =>{
  const appID = '6fbd0b14'
  const appKEY = '11ceb71385aef40e6e562bc95698d9b4'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKEY}`
    )
    const data = await response.json()
    setRecipes(data.hits)
  }

  const getSearch = e =>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  console.log(query);
  console.log(search);

  return (
    <div className='app'>
      <FormControl className='search__form'>
        <Input
          className='search__input'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Please enter the name of the recipe'
        />
        <Button variant='contained' color="primary" type='submit' onClick={getSearch}>Search</Button>
      </FormControl>
      <div className='recipes'>
        {recipes.map((recipe, index) => (
          <Recipe
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            key={index}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}
export default App

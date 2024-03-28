import React from 'react'
import classes from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <input type='text' className={classes['search-bar']} placeholder='Search for a place' />
  )
}

export default SearchBar
import React from 'react'
import classes from './SearchBar.module.css'

const SearchBar = ({scrolled}) => {
  return (
    <div className={scrolled ? classes['search-container-nav'] : classes['search-container-hero']}>
      <input type='text' className={classes['search-bar']} placeholder='Search for a place' />
    </div>
  )
}

export default SearchBar
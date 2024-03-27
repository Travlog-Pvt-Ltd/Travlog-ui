import SearchBar from '../searchbar/SearchBar'

import classes from './Hero.module.css'

const Hero = ({ scrolled }) => {

  return (
    <div className={classes.hero}>
      <div className={classes.content}>
        <SearchBar scrolled={scrolled}/>
      </div>
    </div>
  )
}

export default Hero
import SearchBar from '@components/searchbar/SearchBar'
import classes from './Hero.module.css'
import SearchScrollWrapper from '@components/HOC/SearchScrollWrapper'

const Hero = () => {
  return (
    <div className={classes.hero}>
      <SearchScrollWrapper>
        <SearchBar />
      </SearchScrollWrapper>
    </div>
  )
}

export default Hero
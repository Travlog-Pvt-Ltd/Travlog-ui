import './Hero.css'
import SearchBar from '../searchbar/SearchBar'

const Hero = ({ isScrolled }) => {

  return (
    <div className='hero'>
      <div className='content'>
        <div className='search-container'><SearchBar /></div>
        {/* {!isScrolled ? <div className='search-container'><SearchBar /></div> : null} */}
      </div>
    </div>
  )
}

export default Hero
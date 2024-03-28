import { useEffect, useRef, useState } from 'react'
import SearchBar from '../searchbar/SearchBar'

import classes from './Hero.module.css'
import { useNavbar } from '@/context/NavbarContext'

const Hero = () => {
  const scrollRef = useRef()
  const {setShowSearch} = useNavbar()

  useEffect(()=>{
    const handleScroll = () => {
      const rect = scrollRef.current.getBoundingClientRect()
      const isOutOfScreen = rect.bottom < 0 || rect.top > window.innerHeight
      setShowSearch(isOutOfScreen)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  return (
    <div className={classes.hero}>
      <div ref={scrollRef} className={classes.content}>
        <SearchBar />
      </div>
    </div>
  )
}

export default Hero
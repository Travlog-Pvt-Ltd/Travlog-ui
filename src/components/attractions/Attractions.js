import React from 'react'
import classes from './Attractions.module.css'

import sikkimImg from '@/assets/images/sikkim.jpg'

const Attractions = () => {
  return (
    <div className={classes.container}>
      <h2>Top Attractions</h2>
      <img src={sikkimImg.src}/>
    </div>
  )
}

export default Attractions
import React from 'react'
import { useMediaQuery } from '@mui/material'
import classes from './Attractions.module.css'

import sikkimImg from '@/assets/images/sikkim.jpg'

const Attractions = ({top}) => {
  const mobile = useMediaQuery('(max-width:768px)')
  return (
    <div className={!mobile ? classes.container : classes['mobile-container']}>
      {!mobile && <h2>Top Attractions</h2>}
      <img src={sikkimImg.src}/>
    </div>
  )
}

export default Attractions
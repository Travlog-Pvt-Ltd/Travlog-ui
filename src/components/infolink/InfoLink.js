import React from 'react'
import classes from './InfoLink.module.css'

const InfoLink = ({place}) => {
  return (
    <div className={classes.infolink}>
      Explore {place}
    </div>
  )
}

export default InfoLink
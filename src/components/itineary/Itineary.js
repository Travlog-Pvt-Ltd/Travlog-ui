import React from 'react'
import classes from './Itineary.module.css'

const Itineary = () => {
  return (
    <div className={classes.container}>
      <h2>Plan Your Itineary</h2>
      <div className={classes['date-container']}>
        <div className={classes.inputdate}>
          <label>From</label>
          <input type='date'></input>
        </div>
        <div className={classes.inputdate}>
          <label>To</label>
          <input type='date'></input>
        </div>
      </div>
      <div className={classes.inputplace}>
        <label>Destination</label>
        <input type='text' />
      </div>
      <button className={classes.btn}>Search</button>
    </div>
  )
}

export default Itineary
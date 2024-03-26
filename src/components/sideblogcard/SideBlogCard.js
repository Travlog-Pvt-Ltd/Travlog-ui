import React from 'react'
import classes from './SideBlogCard.module.css'

const SideBlogCard = ({ blog }) => {
  return (
    <p className={classes.sideblog}>{blog.title}</p>
  )
}

export default SideBlogCard
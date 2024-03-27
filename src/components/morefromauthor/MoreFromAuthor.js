'use client';
import React, { useState, useEffect } from 'react'
import classes from './MoreFromAuthor.module.css'
import SideBlogCard from '../sideblogcard/SideBlogCard';

const MoreFromAuthor = () => {
  const [authorBlogs, setAuthorBlogs] = useState([]);

  try {
    useEffect(() => {
      async function fetchBlogs() {
        const response = await fetch("https://travlog.onrender.com/blog/all?limit=3");
        const resData = await response.json();
        setAuthorBlogs(resData);
      }
      fetchBlogs();
    }, []);
  } catch (err) {
    console.log(err);
  }

  if(authorBlogs.count === 0) return (<></>)

  return (
    <div className={classes["mfa-container"]}>
      <h2>More From Author</h2>
      {authorBlogs.map((blog) => (<SideBlogCard blog={blog} key={blog._id} />))}
    </div>
  )
}

export default MoreFromAuthor
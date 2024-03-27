'use client'

import React, { useState, useEffect } from 'react'
import classes from './SingleBlog.module.css'
import { formatDate } from '@/utils/formatdate';

const SingleBlog = ({ blogId }) => {
  const [blog, setBlog] = useState([]);

  try {
    useEffect(() => {
      async function fetchBlog() {
        const response = await fetch(`https://travlog.onrender.com/blog/${blogId}`);
        const resData = await response.json();
        setBlog(resData);
      }
      fetchBlog();
    }, []);
  } catch (err) {
    console.log(err);
  }

  const formattedDate = formatDate(blog.updatedAt);

  return (
    <div className={classes.blog}>
      <h1>{blog.title}</h1>
      {/* <Image src={blog.author.profileImage} alt="" /> */}
      {/* <p>{blog.author.name} <button>Follow</button></p> */}
      <div>
        <p>{formattedDate}</p>
      </div>
      <p className={classes.blogContent}>{blog.content}</p>
    </div>
  )
}

export default SingleBlog
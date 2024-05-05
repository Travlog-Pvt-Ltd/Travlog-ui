'use client';
import React, { useState, useEffect } from 'react'
import classes from './RelatedBlogs.module.css'
import SideBlogCard from '@components/sideblogcard/SideBlogCard';

const RelatedBlogs = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  try {
    useEffect(() => {
      async function fetchBlogs() {
        const response = await fetch("https://backend-travlog.vercel.app/blog/all?limit=3");
        const resData = await response.json();
        setRelatedBlogs(resData);
      }
      fetchBlogs();
    }, []);
  } catch (err) {
    console.log(err);
  }

  if (relatedBlogs.count === 0) return (<></>)

  return (
    <div className={classes["relatedblogs-container"]}>
      <h2>Related Blogs</h2>
      {relatedBlogs.map((blog) => (<SideBlogCard blog={blog} key={blog._id} />))}
    </div>
  )
}

export default RelatedBlogs
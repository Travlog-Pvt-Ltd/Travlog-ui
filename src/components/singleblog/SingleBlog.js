'use client'

import React, { useState, useEffect } from 'react'
import classes from './SingleBlog.module.css'
import { formatDate } from '@/utils/formatdate';
import { getSingleBlog } from '@/utils/api';
import parse from "html-react-parser"
import PageLoader from '../loaders/PageLoader';

const SingleBlog = ({ blogId }) => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true)
      const userId = JSON.parse(localStorage.getItem('travlogUserDetail'))._id
      try {
        const response = await getSingleBlog(`/blog/${blogId}`, { id: userId })
        setBlog(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog();
  }, []);

  return (
    <>
      {loading ? <PageLoader open={loading} /> : (blog && <div className={classes.blog}>
        <h1>{blog.title}</h1>
        {/* <Image src={blog.author.profileImage} alt="" /> */}
        {/* <p>{blog.author.name} <button>Follow</button></p> */}
        <div>
          <p>{formatDate(blog.createdAt)}</p>
        </div>
        <div className={classes.blogContent}>
          {parse(`${blog.content}`)}
        </div>
      </div>)}
    </>
  )
}

export default SingleBlog
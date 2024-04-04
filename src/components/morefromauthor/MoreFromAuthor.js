'use client';
import React, { useState, useEffect } from 'react'
import classes from './MoreFromAuthor.module.css'
import SideBlogCard from '../sideblogcard/SideBlogCard';
import { enqueueSnackbar } from 'notistack';
import { getMoreFromAuthor } from '@/utils/api';
import ComponentLoader from '../loaders/ComponentLoader';

const MoreFromAuthor = ({ author }) => {
  const [authorBlogs, setAuthorBlogs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await getMoreFromAuthor(`/creator/more/${author}`)
        setAuthorBlogs(response.data)
      } catch (error) {
        console.error(error)
        enqueueSnackbar("Unable to fetch more from author!", { variant: "error" })
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs();
  }, []);


  return (
    <div className={classes["mfa-container"]}>
      <h2>More From Author</h2>
      {!loading ? authorBlogs.map((blog) => (
        <SideBlogCard blog={blog} key={blog._id} />
      )) : <ComponentLoader />}
    </div>
  )
}

export default MoreFromAuthor
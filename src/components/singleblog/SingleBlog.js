'use client'

import classes from './SingleBlog.module.css'
import { formatDate } from '@/utils/formatdate';
import parse from "html-react-parser"

const SingleBlog = ({ blog }) => {

  return (
    <>
      {blog && <div className={classes.blog}>
        <h1>{blog.title}</h1>
        {/* <Image src={blog.author.profileImage} alt="" /> */}
        {/* <p>{blog.author.name} <button>Follow</button></p> */}
        <div>
          <p>{formatDate(blog.createdAt)}</p>
        </div>
        <div className={classes.blogContent}>
          {parse(`${blog.content}`)}
        </div>
      </div>}
    </>
  )
}

export default SingleBlog
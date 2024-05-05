'use client'

import { followCreator, unfollowCreator } from '@utils/api';
import classes from './SingleBlog.module.css'
import "@styles/smallLoader.css"
import { formatDate } from '@utils/formatdate';
import parse from "html-react-parser"
import { useState } from 'react';
import { useAuth } from '@context/AuthContext';

const SingleBlog = ({ blog }) => {
  const { user, setUser, isLoggedIn, setOpenLogin } = useAuth()
  const [followLoading, setFollowLoading] = useState(false)

  const handleFollowAuthor = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true)
      return
    }
    setFollowLoading(true)
    try {
      const response = await followCreator("/creator/follow", { creatorId: blog.author._id })
      setUser(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setFollowLoading(false)
    }
  }

  const handleUnfollowAuthor = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true)
      return
    }
    setFollowLoading(true)
    try {
      const response = await unfollowCreator("/creator/unfollow", { creatorId: blog.author._id })
      setUser(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setFollowLoading(false)
    }
  }

  const followsAuthor = () => {
    if (!isLoggedIn) return false
    console.log(user);
    console.log(blog);
    let check = false
    user.followings.map(item => {
      if (item.userId === blog.author._id) check = true
    })
    return check
  }

  return (
    <>
      {blog && <div className={classes.blog}>
        <h1>{blog.title}</h1>
        {/* <img src={blog.author.profileImage} alt="" /> */}
        <div className={classes.author}>
          <p>{blog.author.name}</p>
          {!followLoading ? <div className="like-loader"></div> : (followsAuthor() ? <button onClick={handleUnfollowAuthor}>Unfollow</button> : <button onClick={handleFollowAuthor}>Follow</button>)}
        </div>
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
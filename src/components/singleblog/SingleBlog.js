'use client';

import { followCreator, unfollowCreator } from '@utils/api';
import styles from './SingleBlog.module.css';
import '@styles/smallLoader.css';
import { formatDate } from '@utils/formatdate';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import CommentContainer from '@containers/CommentContainer';
import ButtonGroup from '@components/ButtonGroup';

const SingleBlog = ({ blog }) => {
  const { user, setUser, isLoggedIn, setOpenLogin } = useAuth();
  const [followLoading, setFollowLoading] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [focused, setFocused] = useState(false);

  const handleFollowAuthor = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setFollowLoading(true);
    try {
      const response = await followCreator('/creator/follow', {
        creatorId: blog.author._id,
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollowAuthor = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setFollowLoading(true);
    try {
      const response = await unfollowCreator('/creator/unfollow', {
        creatorId: blog.author._id,
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFollowLoading(false);
    }
  };

  const followsAuthor = () => {
    if (!isLoggedIn) return false;
    let check = false;
    user.followings.map((item) => {
      if (item.userId === blog.author._id) check = true;
    });
    return check;
  };

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <>
      {blog && (
        <>
          <div className={styles.blog}>
            <h1>{blog.title}</h1>
            {/* <img src={blog.author.profileImage} alt="" /> */}
            <div className={styles.author}>
              <p>{blog.author.name}</p>
              {user &&
                blog?.author?._id != user?._id &&
                (followLoading ? (
                  <div className='like-loader'></div>
                ) : followsAuthor() ? (
                  <button onClick={handleUnfollowAuthor}>Unfollow</button>
                ) : (
                  <button onClick={handleFollowAuthor}>Follow</button>
                ))}
            </div>
            <div>
              <p>{formatDate(blog.createdAt)}</p>
            </div>
            <div className={styles.blogContent}>{parse(`${blog.content}`)}</div>
          </div>
          <div className={styles.buttonsContainer}>
            <ButtonGroup
              handleCommentVisibility={toggleComment}
              count={false}
              parentId={blog._id}
            />
          </div>
          {showComment && (
            <div className={styles.commentContainer}>
              <div
                className={`${styles.commentBox} ${focused && styles.activeInput}`}
              >
                <textarea
                  rows={1}
                  placeholder='Add a Comment'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
                {focused && (
                  <div className={styles.replyButtons}>
                    <button>Comment</button>
                    <button onClick={() => setFocused(false)}>Cancel</button>
                  </div>
                )}
              </div>
              <CommentContainer
                author={blog.author._id}
                id={blog._id}
                type={0}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SingleBlog;

'use client';

import { followCreator, unfollowCreator } from '@utils/api';
import styles from './SingleBlog.module.css';
import '@styles/smallLoader.css';
import parse from 'html-react-parser';
import { useCallback, useState } from 'react';
import { useAuth } from '@context/AuthContext';
import CommentContainer from '@containers/CommentContainer';
import ButtonGroup from '@components/ButtonGroup';
import CreateComment from '@components/CreateComment';
import accountIcon from '@assets/logos/account.svg';
import Link from 'next/link';

const SingleBlog = ({ blog }) => {
  const { user, setUser, isLoggedIn, setOpenLogin } = useAuth();
  const [followLoading, setFollowLoading] = useState(false);
  const [showComment, setShowComment] = useState(false);

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

  const getTags = useCallback(() => {
    const places = blog?.tags?.places ?? [];
    const activities = blog?.tags?.activities ?? [];
    return [...places, ...activities];
  }, [blog._id]);

  return (
    <>
      <div className={styles['blog-container']}>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className={styles['blog-thumbnail']}
        />
        <div className={styles['blog-content-section']}>
          <div className={styles['blog-tags']}>
            {getTags().map((tag) => (
              <span key={tag._id} className={styles['blog-tag']}>
                #{tag.name}
              </span>
            ))}
          </div>

          <h1 className={styles['blog-title']}>{blog.title}</h1>

          <div className={styles['blog-author-container']}>
            <div className={styles['blog-author-info']}>
              <img
                src={
                  blog.author.profileLogo
                    ? blog.author.profileLogo
                    : accountIcon.src
                }
                alt={blog.author.name}
                className={styles['blog-author-avatar']}
              />
              <div>
                <h3 className={styles['blog-author-name']}>
                  {blog.author.name}
                </h3>
                <p className={styles['blog-author-date']}>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className={styles['blog-follow-container']}>
              <button
                onClick={
                  followsAuthor() ? handleUnfollowAuthor : handleFollowAuthor
                }
                className={`${styles['blog-follow-button']} ${
                  followsAuthor()
                    ? styles['following']
                    : styles['not-following']
                }`}
              >
                {followLoading ? (
                  <div className='like-loader'></div>
                ) : followsAuthor() ? (
                  'Following'
                ) : (
                  'Follow'
                )}
              </button>
            </div>
          </div>

          <div className={styles['blog-actions']}>
            <Link href='' className={styles['plan-trip-button']}>
              Plan a Trip
            </Link>
            <Link href='' className={styles['view-itinerary-button']}>
              View Itinerary
            </Link>
          </div>
          <div className={styles['blog-content']}>
            {parse(`${blog.content}`)}
          </div>
          <div className={styles['buttons-section']}>
            <ButtonGroup
              handleCommentVisibility={toggleComment}
              count={false}
              parentId={blog._id}
            />
          </div>
        </div>
      </div>
      {showComment && (
        <div className={styles.commentContainer}>
          <CreateComment />
          <CommentContainer author={blog.author._id} id={blog._id} type={0} />
        </div>
      )}
    </>
  );
};

export default SingleBlog;

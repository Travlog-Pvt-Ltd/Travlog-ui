import CommentContainer from '@containers/CommentContainer';
import React, { useState } from 'react';
import styles from './SingleComment.module.css';
import { useAuth } from '@context/AuthContext';
import { followCreator, unfollowCreator } from '@utils/api';
import Replies from '@assets/logos/comment/replies.svg';
import hideReplies from '@assets/logos/comment/hideReplies.svg';
import accountLogo from '@assets/logos/account.svg';
import heartIcon from '@assets/logos/heart.svg';
import dotsIcon from '@assets/logos/dots.svg';
import dislike from '@assets/logos/dislike.svg';
import ButtonGroup from '@components/ButtonGroup';

const SingleComment = ({ comment, author }) => {
  const [showReply, setShowReply] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { user, setUser, isLoggedIn, setOpenLogin } = useAuth();
  const [newReply, setNewReply] = useState('');
  const [replying, setReplying] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleFollowAuthor = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setFollowLoading(true);
    try {
      const response = await followCreator('/creator/follow', {
        creatorId: comment.userId._id,
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
        creatorId: comment.userId._id,
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
      if (item.userId === comment.userId._id) check = true;
    });
    return check;
  };

  return (
    <div className={styles.commentAndReplies}>
      <div className={styles.comment}>
        <div className={styles.profile}>
          <img
            className={`${styles.avatar} ${comment?.userId?.profileLogo ? '' : styles.avatarBorder}`}
            src={
              comment?.userId?.profileLogo
                ? comment?.userId?.profileLogo
                : accountLogo.src
            }
            alt='Profile picture'
          />
          {comment?.replyCount > 0 && (
            <img
              className={styles.toggleReplies}
              src={!showReply ? Replies.src : hideReplies.src}
              onClick={() => setShowReply((prev) => !prev)}
            />
          )}
        </div>
        <div className={styles.commentSection}>
          <div className={styles.commentCard}>
            <div className={styles.header}>
              <span className={styles.authorName}>{comment?.userId?.name}</span>{' '}
              {comment?.userId?._id === author && (
                <span className={styles.author}>Creator</span>
              )}
              {user &&
                comment?.userId?._id != user?._id &&
                (followLoading ? (
                  <div className='like-loader'></div>
                ) : followsAuthor() ? (
                  <button onClick={handleUnfollowAuthor}>Unfollow</button>
                ) : (
                  <button onClick={handleFollowAuthor}>Follow</button>
                ))}
            </div>
            <div className={styles.body}>{comment?.content}</div>
          </div>
          <div className={styles.footer}>
            <span onClick={() => setReplying(true)}>Reply</span>
            <ButtonGroup
              parent='comment'
              parentId={comment._id}
              comment={false}
              share={false}
              bookmark={false}
              customClass={styles.buttons}
            />
          </div>
        </div>
      </div>
      {replying && (
        <div className={`${styles.replyBox} ${focused && styles.activeInput}`}>
          <textarea
            rows={1}
            placeholder='Add a Reply'
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <div className={styles.replyButtons}>
            <button>Comment</button>
            <button onClick={() => setReplying(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showReply && (
        <div className={styles.repliesContainer}>
          <CommentContainer author={author} id={comment?._id} type={1} />
        </div>
      )}
    </div>
  );
};

export default SingleComment;

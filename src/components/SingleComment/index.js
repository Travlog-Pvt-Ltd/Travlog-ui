import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import styles from './SingleComment.module.css';
import { useAuth } from '@context/AuthContext';
import { followCreator, unfollowCreator } from '@utils/api';
import Replies from '@assets/logos/comment/replies.svg';
import hideReplies from '@assets/logos/comment/hideReplies.svg';
import accountLogo from '@assets/logos/account.svg';
import ButtonGroup from '@components/ButtonGroup';
import { timeSinceUpdated } from '@utils/formatdate';
import { useComment } from '@context/CommentContext';
const CreateComment = dynamic(() => import('@components/CreateComment'));
const CommentContainer = dynamic(() => import('@containers/CommentContainer'));

const SingleComment = ({ comment, author, parentId }) => {
  const { comments, editing } = useComment();
  const [showReply, setShowReply] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { user, setUser, isLoggedIn, setOpenLogin } = useAuth();
  const [replying, setReplying] = useState(false);

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

  const handleReplyButton = () => {
    if (comment?.deleted) {
      return;
    } else if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setReplying(true);
  };

  const createdSince = timeSinceUpdated(comment.createdAt);

  return (
    <div className={styles.commentAndReplies}>
      <div className={styles.comment}>
        <div className={styles.profile}>
          <img
            className={`${styles.avatar} ${comment?.userId?.profileLogo ? '' : styles.avatarBorder}`}
            src={
              comment?.userId?.profileLogo && !comment?.deleted
                ? comment?.userId?.profileLogo
                : accountLogo.src
            }
            alt='Profile picture'
          />
          {((comments[`${comment._id}`] &&
            comments[`${comment._id}`].length > 0) ||
            comment?.replyCount > 0) && (
            <img
              className={styles.toggleReplies}
              src={!showReply ? Replies.src : hideReplies.src}
              onClick={() => setShowReply((prev) => !prev)}
            />
          )}
        </div>
        {editing == comment._id ? (
          <CreateComment
            comment={comment._id}
            closeReply={() => setReplying(false)}
            customClass={styles.activeInput}
            edit={true}
            data={comment}
          />
        ) : (
          <div className={styles.commentSection}>
            <div
              className={`${styles.commentCard} ${comment?.deleted && styles.deletedCommentCard}`}
            >
              <div className={styles.header}>
                {comment?.deleted ? (
                  <span className={styles.deletedAuthorName}>deleted</span>
                ) : (
                  <div>
                    <span className={styles.authorName}>
                      {comment?.userId?.name}
                    </span>{' '}
                    {comment?.userId?._id === author && (
                      <span className={styles.author}>Author</span>
                    )}
                  </div>
                )}
                <div className={styles.info}>
                  <span className={styles.since}>{createdSince} ago</span>
                  {comment.edited && (
                    <>
                      <span>•</span>
                      <span>Edited</span>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.body}>{comment?.content}</div>
            </div>
            <div className={styles.footer}>
              <span
                className={comment?.deleted ? 'disabled' : null}
                onClick={handleReplyButton}
              >
                Reply
              </span>
              {!comment?.deleted ? (
                <ButtonGroup
                  parent='comment'
                  parentId={comment._id}
                  commentParentId={parentId}
                  comment={false}
                  share={false}
                  bookmark={false}
                  customClass={styles.buttons}
                  menuList={['Save', 'Edit', 'Delete', 'Report']}
                  author={comment.userId._id}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
      {replying && (
        <div style={{ marginLeft: '40px' }}>
          <CreateComment
            comment={comment._id}
            customClass={styles.activeInput}
            closeReply={() => setReplying(false)}
            reply={true}
            replying={replying}
          />
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

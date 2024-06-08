import React, { useState } from 'react';
import styles from './CreateComment.module.css';
import { writeComment } from '@utils/api';
import { useParams } from 'next/navigation';
import { useAuth } from '@context/AuthContext';
import { useCache } from '@context/CacheContext';

const CreateComment = ({
  reply = false,
  closeReply = () => {},
  replying = null,
  customClass = null,
  blogId,
  comment = null,
  openReplies = () => {},
  isReplyOpen = false,
  refreshReplies = () => {},
}) => {
  const { isLoggedIn, setOpenLogin } = useAuth();
  const { comments, setComments } = useCache();
  const [newComment, setNewComment] = useState('');
  const [focused, setFocused] = useState(false);
  const params = useParams();

  const handleSuccessfulComment = (comment) => {
    if (reply) {
      if (isReplyOpen) {
        refreshReplies();
      } else openReplies();
    } else {
      setComments((prev) => [comment, ...prev]);
    }
  };

  const handleClose = () => {
    setNewComment('');
    if (reply) closeReply();
    setFocused(false);
  };

  const handleSubmit = async (e) => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    let payload = { blog: params.blogId, content: newComment };
    if (reply) payload = { ...payload, comment };
    try {
      const response = await writeComment(
        `/comment/${reply ? 'comment' : 'blog'}/${reply ? 'reply' : 'comment'}`,
        payload
      );
      handleSuccessfulComment(response.data.comment);
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  };

  const isOpen = () => {
    if (replying != null) return replying;
    else return focused;
  };

  return (
    <div
      className={`${styles.commentBox} ${focused && (customClass ? customClass : styles.activeInput)}`}
      style={{ marginLeft: reply ? '40px' : '' }}
    >
      <textarea
        rows={1}
        placeholder='Add a Comment'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onFocus={() => setFocused(true)}
      />
      {isOpen() && (
        <div className={styles.replyButtons}>
          <button onClick={handleSubmit}>Comment</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CreateComment;

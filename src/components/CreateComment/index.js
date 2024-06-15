import React, { useState } from 'react';
import styles from './CreateComment.module.css';
import { writeComment } from '@utils/api';
import { useParams } from 'next/navigation';
import { useAuth } from '@context/AuthContext';
import { useComment } from '@context/CommentContext';
import ComponentLoader from '@components/loaders/ComponentLoader';

const CreateComment = ({
  reply = false,
  closeReply = () => {},
  replying = null,
  customClass = null,
  comment = null,
}) => {
  const { isLoggedIn, setOpenLogin } = useAuth();
  const { setComments } = useComment();
  const [newComment, setNewComment] = useState('');
  const [focused, setFocused] = useState(false);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleSuccessfulComment = (comment, parent) => {
    setComments((prev) => {
      const prevComments = { ...prev };
      let temp = prevComments[`${parent}`] ?? [];
      temp = [comment, ...temp];
      prevComments[`${parent}`] = temp;
      return prevComments;
    });
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
    setLoading(true);
    let payload = { blog: params.blogId, content: newComment };
    if (reply) payload = { ...payload, comment };
    try {
      const response = await writeComment(
        `/comment/${reply ? 'comment' : 'blog'}/${reply ? 'reply' : 'comment'}`,
        payload
      );
      const parent = reply ? comment : params.blogId;
      handleSuccessfulComment(response?.data?.comment, parent);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          <button onClick={handleSubmit}>
            {loading ? (
              <ComponentLoader className='buttonLoaderWhite' />
            ) : (
              'Comment'
            )}
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CreateComment;

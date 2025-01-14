import React, { useState } from 'react';
import styles from './CreateComment.module.css';
import { editComment, writeComment } from '@utils/api';
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
  edit = false,
  data = null,
}) => {
  const { isLoggedIn, setOpenLogin } = useAuth();
  const { setComments, setEditing } = useComment();
  const [newComment, setNewComment] = useState(data?.content ?? '');
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
    setEditing(null);
  };

  const handleEditing = async () => {
    try {
      setLoading(true);
      const payload = { commentId: comment, content: newComment };
      const res = await editComment('/comment/comment/edit', payload);
      const updatedComment = res?.data?.comment;
      const parent = updatedComment?.isReply
        ? updatedComment?.parent
        : updatedComment?.blog;
      setComments((prev) => {
        const prevComments = { ...prev };
        let temp = prevComments[`${parent}`] ?? [];
        temp = temp.map((item) => {
          if (item._id == updatedComment._id) return updatedComment;
          else return item;
        });
        prevComments[`${parent}`] = temp;
        return prevComments;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      handleClose();
      setEditing(null);
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setLoading(true);
    let payload = { blog: params.blogId, content: newComment };
    if (reply) payload = { ...payload, commentId: comment };
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

  const handleClick = async () => {
    if (edit) await handleEditing();
    else await handleSubmit();
  };

  const isOpen = () => {
    if (replying != null) return replying;
    else return focused;
  };

  return (
    <div
      className={`${styles.commentBox} ${focused && (customClass ? customClass : styles.activeInput)}`}
    >
      <textarea
        rows={1}
        placeholder='Add a Comment'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onFocus={() => setFocused(true)}
        autoFocus={edit || replying}
      />
      {isOpen() && (
        <div className={styles.replyButtons}>
          <button onClick={handleClick}>
            {loading ? (
              <ComponentLoader className='buttonLoaderWhite' />
            ) : edit ? (
              'Save'
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

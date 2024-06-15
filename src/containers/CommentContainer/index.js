import SingleComment from '@components/SingleComment';
import { getComments } from '@utils/api';
import React, { useEffect, useState } from 'react';
import styles from './CommentContainer.module.css';
import { useComment } from '@context/CommentContext';
import ComponentLoader from '@components/loaders/ComponentLoader';

const CommentContainer = ({ id, type, author }) => {
  const { comments, setComments } = useComment();

  const getData = async () => {
    try {
      const res = await getComments('/comment/', { id, type });
      setComments((prev) => ({ ...prev, [`${id}`]: res?.data ?? [] }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.commentContainer}>
      {comments[`${id}`] ? (
        comments[`${id}`].map((comment) => {
          return (
            <SingleComment
              author={author}
              key={comment._id}
              comment={comment}
              parentId={id}
            />
          );
        })
      ) : (
        <ComponentLoader />
      )}
    </div>
  );
};

export default CommentContainer;

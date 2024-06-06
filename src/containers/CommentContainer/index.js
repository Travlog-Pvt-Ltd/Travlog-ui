import SingleComment from '@components/SingleComment';
import { getComments } from '@utils/api';
import React, { useEffect, useState } from 'react';
import styles from './CommentContainer.module.css';

const CommentContainer = ({ id, type, author }) => {
  const [comments, setComments] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await getComments('/comment/', { id, type });
      setComments(res.data);
    };
    getData();
  }, []);

  return (
    <div className={styles.commentContainer}>
      {comments?.map((comment) => {
        return (
          <SingleComment author={author} key={comment._id} comment={comment} />
        );
      })}
    </div>
  );
};

export default CommentContainer;

import SingleComment from '@components/SingleComment';
import { getComments } from '@utils/api';
import React, { useEffect, useState } from 'react';
import styles from './CommentContainer.module.css';
import { useCache } from '@context/CacheContext';

const CommentContainer = ({
  id,
  type,
  author,
  refresh = false,
  resetRefresh = () => {},
}) => {
  const [data, setData] = useState();
  const { comments, setComments } = useCache();

  const getData = async () => {
    const res = await getComments('/comment/', { id, type });
    setData(res.data);
    if (!type) {
      setComments(res.data);
    }
  };

  if (refresh) {
    getData();
    resetRefresh();
  }

  useEffect(() => {
    if (!type && comments.length > 0) {
      setData(comments);
    } else {
      getData();
    }
  }, [comments]);

  return (
    <div className={styles.commentContainer}>
      {data?.map((comment) => {
        return (
          <SingleComment author={author} key={comment._id} comment={comment} />
        );
      })}
    </div>
  );
};

export default CommentContainer;

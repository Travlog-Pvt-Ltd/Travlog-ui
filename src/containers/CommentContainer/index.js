import SingleComment from '@components/SingleComment';
import { getComments } from '@utils/api';
import React, { useEffect, useState } from 'react';
import styles from './CommentContainer.module.css';
import { useComment } from '@context/CommentContext';
import ComponentLoader from '@components/loaders/ComponentLoader';

const CommentContainer = ({ id, type, author }) => {
  const { comments, setComments } = useComment();
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getData = async (skip) => {
    try {
      let limit = 10;
      if (comments[`${id}`]?.length > limit) limit = comments[`${id}`]?.length;
      const res = await getComments('/comment/', {
        id,
        type,
        limit,
        skip,
      });
      setComments((prev) => {
        const temp = prev[`${id}`] ?? [];
        if (skip == 0) return { ...prev, [`${id}`]: res.data.comment ?? [] };
        else
          return {
            ...prev,
            [`${id}`]: [...temp, ...res.data.comment],
          };
      });
      setSkip(res?.data?.skip);
      if (res?.data?.comment?.length < limit) setHasMore(false);
      else setHasMore(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreComments = () => {
    if (!hasMore) return;
    setLoading(true);
    getData(comments[`${id}`].length ?? 0);
  };

  useEffect(() => {
    if (!hasMore) return;
    setHasMore(false);
    getData(skip);
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
      {hasMore &&
        (loading ? (
          <ComponentLoader />
        ) : (
          <div onClick={loadMoreComments} className={styles.moreComments}>
            Load more comments...
          </div>
        ))}
    </div>
  );
};

export default CommentContainer;

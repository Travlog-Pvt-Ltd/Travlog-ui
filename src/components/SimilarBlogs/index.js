'use client';
import React, { useState, useEffect } from 'react';
import styles from './SimilarBlogs.module.css';
import SquareBlogCard from '@components/squareBlogCard';
import { getSimilarBlogs } from '@utils/api';

const SimilarBlogs = ({ blog }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  try {
    useEffect(() => {
      async function fetchBlogs() {
        const response = await getSimilarBlogs(
          `/blog/similar/${blog._id}?limit=4`
        );
        setRelatedBlogs(response.data);
      }
      fetchBlogs();
    }, []);
  } catch (err) {
    console.log(err);
  }

  if (relatedBlogs.length === 0) return null;

  return (
    <div className={styles['relatedblogs-container']}>
      <h2 className={styles['similar-posts-title']}>Similar Posts</h2>
      <div className={styles['grid-container']}>
        {relatedBlogs.map((blog) => (
          <SquareBlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
};

export default SimilarBlogs;

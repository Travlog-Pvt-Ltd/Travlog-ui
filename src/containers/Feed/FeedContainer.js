'use client';

import { useMediaQuery } from '@mui/material';
import classes from './FeedContainer.module.css';
import Blogcard from '@components/blogcard/Blogcard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllBlogs } from '@utils/api';
import ComponentLoader from '@components/loaders/ComponentLoader';
import FeedLoader from '@components/loaders/FeedLoader';
import { useFeed } from '@context/FeedContext';

const FeedContainer = ({ initialData }) => {
  const mobile = useMediaQuery('(max-width:768px)');
  const {
    blogs,
    setBlogs,
    fetchBlogs,
    hasmore,
    setHasmore,
    loading,
    setLoading,
  } = useFeed();
  const observer = useRef();

  useEffect(() => {
    if (initialData) {
      setBlogs(initialData);
      setLoading(false);
      setHasmore(initialData.length >= 10);
    }
  }, []);

  const lastElementRef = useCallback(
    (node) => {
      if (loading || !hasmore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchBlogs();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasmore]
  );

  return (
    <div
      className={
        mobile ? classes['homepage-mobile-left'] : classes['homepage-left']
      }
    >
      {loading && blogs.length === 0 && (
        <>
          <FeedLoader mobile={mobile} open={loading} />
          <FeedLoader mobile={mobile} open={loading} />
          <FeedLoader mobile={mobile} open={loading} />
        </>
      )}
      {blogs.length > 0 &&
        blogs.map((blog, index) => {
          if (blogs.length - 1 === index) {
            return (
              <div
                key={blog._id}
                ref={lastElementRef}
                className={classes.blogcard}
              >
                <Blogcard blog={blog} setBlogs={setBlogs} />
              </div>
            );
          } else {
            return (
              <div key={blog._id} className={classes.blogcard}>
                <Blogcard blog={blog} setBlogs={setBlogs} />
              </div>
            );
          }
        })}
      {loading && blogs.length > 0 && mobile && <ComponentLoader />}
      {loading && blogs.length > 0 && !mobile && <FeedLoader />}
    </div>
  );
};

export default FeedContainer;

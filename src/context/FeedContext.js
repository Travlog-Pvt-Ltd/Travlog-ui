'use client';

import { addBookmark, getAllBlogs } from '@utils/api';
import { enqueueSnackbar } from 'notistack';
import { createContext, useContext, useState } from 'react';
const FeedContext = createContext();

function FeedProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [skip, setSkip] = useState(10);
  const [hasmore, setHasmore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const limit = 10;

  async function fetchBlogs() {
    if (!hasmore) return;
    setLoading(true);
    try {
      const response = await getAllBlogs('/blog/all', { limit, skip });
      setBlogs((prev) => [...prev, ...response?.data]);
      setSkip((prev) => prev + limit);
      if (response?.data.length < limit) setHasmore(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const saveBlog = async (id) => {
    setSaving(true);
    try {
      const res = await addBookmark('/bookmark', { blog: id });
      const blog = res?.data?.blog;
      setBlogs((prev) => {
        const temp = prev.map((item) => {
          if (item._id == blog._id) return blog;
          else return item;
        });
        return temp;
      });
      enqueueSnackbar('Blog bookmarked!', { variant: 'success' });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <FeedContext.Provider
      value={{
        blogs,
        setBlogs,
        fetchBlogs,
        saveBlog,
        hasmore,
        setHasmore,
        loading,
        setLoading,
        saving,
        setSaving,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => {
  return useContext(FeedContext);
};

export default FeedProvider;

'use client';

import { deleteCommentAPI } from '@utils/api';
import { usePathname } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';
const CommentContext = createContext();

function CommentProvider({ children }) {
  const pathname = usePathname();
  const [commentParent, setCommentParent] = useState(null);
  const [comments, setComments] = useState({});
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (
      pathname.startsWith('/blog/') &&
      commentParent != pathname.split('/')[2]
    ) {
      setCommentParent(pathname.split('/')[2]);
      setComments({});
    }
  }, [pathname]);

  const deleteComment = async (id, parentId) => {
    setDeleting(true);
    try {
      await deleteCommentAPI(`/comment/delete/${id}`);
      setComments((prev) => {
        const prevComments = { ...prev };
        let temp = comments[`${parentId}`] ?? [];
        temp = temp.filter((item) => {
          return item._id != id;
        });
        prevComments[`${parentId}`] = temp;
        return prevComments;
      });
      enqueueSnackbar('Comment deleted!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        commentParent,
        setCommentParent,
        comments,
        setComments,
        deleteComment,
        deleting,
        setDeleting,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export const useComment = () => {
  return useContext(CommentContext);
};

export default CommentProvider;

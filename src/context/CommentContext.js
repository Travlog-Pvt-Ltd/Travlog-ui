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
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (
      pathname.startsWith('/blog/') &&
      commentParent != pathname.split('/')[2]
    ) {
      setCommentParent(pathname.split('/')[2]);
      setComments({});
    }
  }, [pathname]);

  const deleteComment = async (id) => {
    setDeleting(true);
    try {
      const res = await deleteCommentAPI(`/comment/delete/${id}`);
      const updatedComment = res?.data?.comment;
      const parent = updatedComment?.isReply
        ? updatedComment?.parent
        : updatedComment?.blog;
      setComments((prev) => {
        const prevComments = { ...prev };
        let temp = comments[`${parent}`] ?? [];
        temp = temp.map((item) => {
          if (item._id == updatedComment._id) return updatedComment;
          else return item;
        });
        prevComments[`${parent}`] = temp;
        return prevComments;
      });
      enqueueSnackbar('Comment deleted!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.response?.data?.message, {
        variant: 'error',
      });
    } finally {
      setDeleting(false);
    }
  };

  const editComment = (id) => {
    setEditing(id);
  };

  return (
    <CommentContext.Provider
      value={{
        commentParent,
        setCommentParent,
        comments,
        setComments,
        deleteComment,
        editComment,
        deleting,
        setDeleting,
        editing,
        setEditing,
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

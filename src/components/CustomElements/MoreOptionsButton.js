import { useState } from 'react';
import dotsIcon from '@assets/logos/dots.svg';
import { Menu, MenuItem } from '@mui/material';
import {
  deleteBlog,
  reportBlog,
  reportComment,
  reportUser,
  saveBlog,
  saveComment,
} from '@components/actions/ButtonActions';
import { useComment } from '@context/CommentContext';
import ComponentLoader from '@components/loaders/ComponentLoader';
import { useAuth } from '@context/AuthContext';
import { useFeed } from '@context/FeedContext';

const MoreOptionsButton = ({
  commentParentId = null,
  parent = 'blog',
  parentId = null,
  menuList = [],
  author = null,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { deleteComment, editComment, deleting } = useComment();
  const { saveBlog, saving } = useFeed();
  const { user, isLoggedIn, setOpenLogin } = useAuth();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClick = async (item) => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    if (item == 'Delete') {
      if (parent == 'blog') deleteBlog(parentId);
      else if (parent == 'comment')
        await deleteComment(parentId, commentParentId);
    } else if (item == 'Report') {
      if (parent == 'blog') reportBlog(parentId);
      else if (parent == 'comment') reportComment(parentId);
      else if (parent == 'user') reportUser(parentId);
    } else if (item == 'Save' || item == 'Bookmark') {
      if (parent == 'blog') {
        await saveBlog(parentId);
      } else if (parent == 'comment') saveComment(parentId);
    } else if (item == 'Edit') {
      if (parent == 'blog') editBlog(parentId);
      else if (parent == 'comment') editComment(parentId);
    }
    handleMenuClose();
  };

  return (
    <>
      <img src={dotsIcon.src} onClick={handleMenuOpen} alt='More options' />
      {anchorEl && (
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          {menuList.map((item) => {
            if (deleting && item == 'Delete')
              return (
                <MenuItem key='Delete'>
                  <ComponentLoader className='buttonLoader' />
                </MenuItem>
              );
            if (saving && item == 'Bookmark')
              return (
                <MenuItem key='Delete'>
                  <ComponentLoader className='buttonLoader' />
                </MenuItem>
              );
            if (item == 'Report' && user._id == author) return null;
            if (item == 'Delete' && user._id != author) return null;
            if (item == 'Edit' && user._id != author) return null;
            return (
              <MenuItem key={item} onClick={() => handleMenuClick(item)}>
                {item}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </>
  );
};

export default MoreOptionsButton;

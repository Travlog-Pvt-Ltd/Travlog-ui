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

const MoreOptionsButton = ({ commentParentId, parent, parentId, menuList }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { deleteComment, deleting } = useComment();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClick = async (item) => {
    if (item == 'Delete') {
      if (parent == 'blog') deleteBlog(parentId);
      else if (parent == 'comment')
        await deleteComment(parentId, commentParentId);
    } else if (item == 'Report') {
      if (parent == 'blog') reportBlog(parentId);
      else if (parent == 'comment') reportComment(parentId);
      else if (parent == 'user') reportUser(parentId);
    } else if (item == 'Save' || item == 'Bookmark') {
      if (parent == 'blog') saveBlog(parentId);
      else if (parent == 'comment') saveComment(parentId);
    }
  };

  return (
    <>
      <img src={dotsIcon.src} onClick={handleMenuOpen} alt='More options' />
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
          return (
            <MenuItem key={item} onClick={() => handleMenuClick(item)}>
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default MoreOptionsButton;

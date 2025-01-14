import React, { useState } from 'react';
import styles from './ButtonGroup.module.css';
import heartIcon from '@assets/logos/heart.svg';
import shareIcon from '@assets/logos/share.svg';
import dislikeIcon from '@assets/logos/dislike.svg';
import bookmarkIcon from '@assets/logos/bookmark.svg';
import commentIcon from '@assets/logos/comment.svg';
import blueheart from '@assets/logos/Blueheart.svg';
import redheart from '@assets/logos/Redheart.svg';
import { useAuth } from '@context/AuthContext';
import { dislikeAction, likeAction } from '@utils/api';
import { useParams } from 'next/navigation';
import MoreOptionsButton from '@components/CustomElements/MoreOptionsButton';

const ButtonGroup = ({
  like = true,
  dislike = true,
  comment = true,
  share = true,
  bookmark = true,
  handleCommentVisibility = () => {},
  count = true,
  customClass = null,
  parent = 'blog',
  parentId = null,
  menuList = [],
  commentParentId = null,
  author = null,
}) => {
  const { isLoggedIn, setOpenLogin, user, setUser } = useAuth();
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);
  const params = useParams();

  const handleLike = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setLikeLoading(true);
    try {
      let payload = {};
      if (parent === 'blog') payload = { blogId: parentId };
      else if (parent === 'comment') {
        payload = { commentId: parentId, blog: params.blogId };
      }
      const response = await likeAction(`/like/${parent}/like`, payload);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDislike = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setDislikeLoading(true);
    try {
      let payload = {};
      if (parent === 'blog') payload = { blogId: parentId };
      else if (parent === 'comment') {
        payload = { commentId: parentId, blog: params.blogId };
      }
      const response = await dislikeAction(`/like/${parent}/dislike`, payload);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setDislikeLoading(false);
    }
  };

  return (
    <div className={`${styles.buttons} ${customClass}`}>
      {like &&
        (likeLoading ? (
          <div className='like-loader'></div>
        ) : user?.likes?.includes(parentId) ? (
          <img onClick={handleLike} src={blueheart.src} alt='Remove Like' />
        ) : (
          <img onClick={handleLike} src={heartIcon.src} alt='Like' />
        ))}
      {dislike &&
        (dislikeLoading ? (
          <div className='like-loader'></div>
        ) : user?.dislikes?.includes(parentId) ? (
          <img
            onClick={handleDislike}
            src={redheart.src}
            alt='Remove Dislike'
          />
        ) : (
          <img onClick={handleDislike} src={dislikeIcon.src} alt='Dislike' />
        ))}
      {comment && (
        <img
          onClick={handleCommentVisibility}
          src={commentIcon.src}
          alt='Comment'
        />
      )}
      {share && <img src={shareIcon.src} alt='Share' />}
      {bookmark && <img src={bookmarkIcon.src} alt='Bookmark' />}
      {menuList.length > 0 && (
        <MoreOptionsButton
          commentParentId={commentParentId}
          parent={parent}
          parentId={parentId}
          menuList={menuList}
          author={author}
        />
      )}
    </div>
  );
};

export default ButtonGroup;

import Image from 'next/image';
import classes from './Blogcard.module.css';
import '@styles/smallLoader.css';
import { formatDate } from '@utils/formatdate';
import accountIcon from '@assets/logos/account.svg';
import heartIcon from '@assets/logos/heart.svg';
import shareIcon from '@assets/logos/share.svg';
import dislike from '@assets/logos/dislike.svg';
import Blueheart from '@assets/logos/Blueheart.svg';
import Redheart from '@assets/logos/Redheart.svg';
import { useRouter } from 'next/navigation';
import parse from 'html-react-parser';
import { useMediaQuery } from '@mui/material';
import { dislikeAction, likeAction } from '@utils/api';
import { useAuth } from '@context/AuthContext';
import { useCallback, useState } from 'react';
import MoreOptionsButton from '@components/CustomElements/MoreOptionsButton';

const Blogcard = ({ blog, setBlogs }) => {
  const { isLoggedIn, setOpenLogin, user, setUser } = useAuth();
  const router = useRouter();
  const smallMobile = useMediaQuery('(max-width:580px)');
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);

  const getBlogContent = (content) => {
    const result = content
      .replace(/<img[^>]*>/g, '')
      .replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ');
    return result;
  };

  const getTags = useCallback(() => {
    const places = blog?.tags?.places ?? [];
    const activities = blog?.tags?.activities ?? [];
    return [...places, ...activities];
  }, [blog._id]);

  const blogTags = getTags();

  const handleLike = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    setLikeLoading(true);
    try {
      const response = await likeAction('/like/blog/like', {
        blogId: blog._id,
      });
      setUser(response.data.user);
      setBlogs((prev) => {
        const temp = prev.map((item) => {
          if (item._id == response.data.blog._id) return response.data.blog;
          else return item;
        });
        return temp;
      });
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
      const response = await dislikeAction('/like/blog/dislike', {
        blogId: blog._id,
      });
      setUser(response.data.user);
      setBlogs((prev) => {
        const temp = prev.map((item) => {
          if (item._id == response.data.blog._id) return response.data.blog;
          else return item;
        });
        return temp;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDislikeLoading(false);
    }
  };

  return (
    <>
      {blog.thumbnail ? (
        <img
          onClick={() => router.push(`/blog/${blog._id}`)}
          loading='lazy'
          className={classes['bc-img']}
          src={blog.thumbnail}
          alt='Blog thumbnail'
        />
      ) : null}

      <div className={classes['bc-body']}>
        <div className={classes['bc-header']}>
          <div
            onClick={() => router.push(`/blog/${blog._id}`)}
            className={classes['bc-title']}
          >
            {blog.title}
          </div>
          <div className={classes['bc-info']}>
            <div className={classes['bc-author-info']}>
              <span>{blog.author.name}</span>
              <span className={classes['bc-date']}>
                {formatDate(blog.createdAt)}
              </span>
            </div>
            <img
              src={
                blog.author.profileLogo
                  ? blog.author.profileLogo
                  : accountIcon.src
              }
              alt=''
            />
          </div>
        </div>
        <div>
          <div
            onClick={() => router.push(`/blog/${blog._id}`)}
            className={classes['bc-content']}
          >
            {parse(`${getBlogContent(blog.content)}`)}
          </div>
        </div>

        <div>
          <div className={classes['bc-footer']}>
            {blogTags?.length > 0 ? (
              <div className={classes.tags}>
                {!smallMobile &&
                  blogTags.slice(0, 2).map((tag) => {
                    return (
                      <span key={tag._id} className={classes['tag-chip']}>
                        {tag.name}
                      </span>
                    );
                  })}
                {smallMobile &&
                  blogTags.slice(0, 1).map((tag) => {
                    return (
                      <span key={tag._id} className={classes['tag-chip']}>
                        {tag.name}
                      </span>
                    );
                  })}
                {!smallMobile && blogTags.length > 2 && (
                  <span
                    className={`${classes['tag-chip']} ${classes['num-chip']}`}
                  >
                    +{blogTags.length - 2}
                  </span>
                )}
                {smallMobile && blogTags.length > 1 && (
                  <span
                    className={`${classes['tag-chip']} ${classes['num-chip']}`}
                  >
                    +{blogTags.length - 1}
                  </span>
                )}
              </div>
            ) : (
              <div></div>
            )}
            <div className={classes.iconContainer}>
              <span onClick={handleLike} className={classes.icons}>
                {likeLoading ? (
                  <div className='like-loader'></div>
                ) : user?.likes?.includes(blog._id) ? (
                  <Image src={Blueheart} />
                ) : (
                  <Image src={heartIcon} />
                )}
              </span>
              <span onClick={handleDislike} className={classes.icons}>
                {dislikeLoading ? (
                  <div className='like-loader'></div>
                ) : user?.dislikes?.includes(blog._id) ? (
                  <Image src={Redheart} />
                ) : (
                  <Image src={dislike} />
                )}
              </span>
              <span className={classes.icons}>
                <Image src={shareIcon} />
              </span>
              <span className={classes.icons}>
                <MoreOptionsButton
                  parent='blog'
                  parentId={blog._id}
                  menuList={['Bookmark', 'Hide', 'Report']}
                  author={blog.author._id}
                />
              </span>
            </div>
          </div>
          <div className={classes['bc-stat-count']}>
            <span>{blog?.likeCount} likes</span>
            <span>{blog?.viewCount} views</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogcard;

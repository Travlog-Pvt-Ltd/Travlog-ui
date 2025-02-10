import Image from 'next/image';
import styles from './Blogcard.module.css';
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
    <div className={styles['blog-card']}>
      <div
        onClick={() => router.push(`/blog/${blog._id}`)}
        className={styles['blog-thumbnail']}
      >
        <img src={blog.thumbnail} alt={blog.title} />
      </div>

      <div className={styles['blog-content']}>
        <div>
          <div className={styles['blog-meta']}>
            <span>{blog.author.name}</span> •{' '}
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          </div>
          <h3
            onClick={() => router.push(`/blog/${blog._id}`)}
            className={styles['blog-title']}
          >
            {blog.title}
          </h3>
          <p
            onClick={() => router.push(`/blog/${blog._id}`)}
            className={styles['blog-excerpt']}
          >
            {parse(`${getBlogContent(blog.content)}`)}
          </p>
          <div className={styles['blog-tags']}>
            {blogTags.slice(0, 3).map((tag) => (
              <span key={tag._id} className={styles['blog-tag']}>
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles['blog-actions']}>
          <button onClick={handleLike} className={styles.icons}>
            {likeLoading ? (
              <div className='like-loader'></div>
            ) : user?.likes?.includes(blog._id) ? (
              <Image src={Blueheart} />
            ) : (
              <Image src={heartIcon} />
            )}
            &nbsp;
            <span>{blog.likeCount}</span>
          </button>

          <button onClick={handleDislike} className={styles.icons}>
            {dislikeLoading ? (
              <div className='like-loader'></div>
            ) : user?.dislikes?.includes(blog._id) ? (
              <Image src={Redheart} />
            ) : (
              <Image src={dislike} />
            )}
            &nbsp;
            <span>{blog.likeCount}</span>
          </button>

          <button className={styles.icons}>
            <Image src={shareIcon} />
            &nbsp; Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogcard;

import React, { useCallback } from 'react';
import styles from './SquareBlogCard.module.css';
import parse from 'html-react-parser';
import heartIcon from '@assets/logos/heart.svg';
import commentIcon from '@assets/logos/comment.svg';
import Link from 'next/link';

const SquareBlogCard = ({ blog }) => {
  const getTags = useCallback(() => {
    const places = blog?.tags?.places ?? [];
    const activities = blog?.tags?.activities ?? [];
    return [...places, ...activities];
  }, [blog._id]);

  const getBlogContent = (content) => {
    const result = content
      .replace(/<img[^>]*>/g, '')
      .replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ');
    return result;
  };

  return (
    <Link href={`/blog/${blog._id}`} className={styles['blog-card-link']}>
      <div className={styles['blog-card']}>
        <div className={styles['blog-image-container']}>
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className={styles['blog-thumbnail']}
          />
          <div className={styles['blog-image-overlay']} />
        </div>
        <div className={styles['blog-content']}>
          {getTags().length > 0 ? (
            <div className={styles['blog-tags']}>
              {getTags()
                .slice(0, 2)
                .map((tag) => (
                  <span key={tag._id} className={styles['blog-tag']}>
                    #{tag.name}
                  </span>
                ))}
            </div>
          ) : null}
          <h3 className={styles['blog-title']}>{blog.title}</h3>
          <p className={styles['blog-description']}>
            {parse(`${getBlogContent(blog.content)}`)}
          </p>
          <div className={styles['blog-meta']}>
            <span>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              })}
            </span>
            <div className={styles['blog-stats']}>
              <span className={styles['stat-item']}>
                <img src={heartIcon.src} alt='likes' />
                {blog.likeCount}
              </span>
              <span className={styles['stat-item']}>
                <img src={commentIcon.src} alt='comments' />
                {blog.commentCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SquareBlogCard;

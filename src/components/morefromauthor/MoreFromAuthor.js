'use client';
import React, { useState, useEffect } from 'react';
import styles from './MoreFromAuthor.module.css';
import SquareBlogCard from '@components/squareBlogCard/index.js';
import { enqueueSnackbar } from 'notistack';
import { getMoreFromAuthor } from '@utils/api';
import ComponentLoader from '@components/loaders/ComponentLoader';
import accountIcon from '@assets/logos/account.svg';
import Link from 'next/link';

const MoreFromAuthor = ({ author, blogId }) => {
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await getMoreFromAuthor(
          `/creator/more/${author._id}?blogId=${blogId}&limit=4`
        );
        setAuthorBlogs(response.data);
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Unable to fetch more from author!', {
          variant: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className={styles['mfa-container']}>
      <div className={styles['author-section']}>
        <div className={styles['author-info']}>
          <img
            src={author.profileLogo ? author.profileLogo : accountIcon.src}
            alt={author.name}
            className={styles['author-avatar']}
          />
          <div>
            <h2 className={styles['author-name']}>More from {author.name}</h2>
            {author?.shortIntro ? (
              <p className={styles['author-intro']}>{author.shortIntro}</p>
            ) : null}
          </div>
        </div>
        <Link href='' className={styles['view-profile-button']}>
          View Profile
        </Link>
      </div>

      <div className={styles['grid-container']}>
        {!loading ? (
          authorBlogs.map((blog) => (
            <SquareBlogCard blog={blog} key={blog._id} />
          ))
        ) : (
          <ComponentLoader />
        )}
      </div>
    </div>
  );
};

export default MoreFromAuthor;

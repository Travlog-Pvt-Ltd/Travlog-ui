'use client';
import { useEffect, useState } from 'react';

import styles from './page.module.css';

import Attractions from '@components/attractions/Attractions';
import MoreFromAuthor from '@components/morefromauthor/MoreFromAuthor';
import SimilarBlogs from '@components/SimilarBlogs/index.js';
import SingleBlog from '@components/singleblog/SingleBlog';
import PageLoader from '@components/loaders/PageLoader';
import { getSingleBlog } from '@utils/api';
import { getUserDetailFromCookie } from '@utils/localStorageUtils';
import BlogNotFound from '@components/blogPage/blogNotFound/index.js';
import Link from 'next/link';

const BlogPostPage = ({ params }) => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        let userId = '';
        const cookieUser = getUserDetailFromCookie();
        if (cookieUser) userId = cookieUser._id;
        const response = await getSingleBlog(`/blog/${params.blogId}`, {
          id: userId,
        });
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, []);

  const backToHome = () => {
    return (
      <Link href='/' className={styles['back-link']}>
        Back to all posts
      </Link>
    );
  };

  if (!(loading || blog)) {
    return <BlogNotFound />;
  }

  return (
    <main className={styles['blog-page']}>
      {loading ? (
        <PageLoader open={loading} />
      ) : (
        <>
          <div className={styles['blog-page-container']}>{backToHome()}</div>
          <SingleBlog blog={blog} />
          <MoreFromAuthor author={blog.author} blogId={params.blogId} />
          <SimilarBlogs blog={blog} />
        </>
      )}
    </main>
  );
};

export default BlogPostPage;

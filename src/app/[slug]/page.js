'use client';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

import classes from './page.module.css';

import Attractions from '@components/attractions/Attractions';
import MoreFromAuthor from '@components/morefromauthor/MoreFromAuthor';
import RelatedBlogs from '@components/relatedblogs/RelatedBlogs';
import SingleBlog from '@components/singleblog/SingleBlog';
import PageLoader from '@components/loaders/PageLoader';
import { getSingleBlog } from '@utils/api';
import { getCookie } from 'cookies-next';

const BlogPostPage = ({ params }) => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const mobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        let userId = '';
        const cookieUser = getCookie('travlogUserDetail');
        if (cookieUser) userId = JSON.parse(cookieUser)._id;
        const response = await getSingleBlog(`/blog/${params.slug}`, {
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

  return (
    <main>
      {loading ? (
        <PageLoader open={loading} />
      ) : (
        <div className={classes.blogpage}>
          {blog && (
            <div className={classes['blogpage-left']}>
              <SingleBlog blog={blog} />
            </div>
          )}
          {!mobile && blog && (
            <div className={classes['blogpage-right']}>
              <Attractions />
              <MoreFromAuthor author={blog.author._id} />
              <RelatedBlogs />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default BlogPostPage;

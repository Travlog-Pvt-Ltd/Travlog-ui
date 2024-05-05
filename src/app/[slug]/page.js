'use client';
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

import classes from './page.module.css'

import InfoLink from "@/components/infolink/InfoLink";
import Attractions from "@/components/attractions/Attractions";
import MoreFromAuthor from "@/components/morefromauthor/MoreFromAuthor";
import RelatedBlogs from "@/components/relatedblogs/RelatedBlogs";
import SingleBlog from "@/components/singleblog/SingleBlog";
import PageLoader from "@/components/loaders/PageLoader";
import { getSingleBlog } from "@/utils/api";
import { getLocalStorageItems } from "@/utils/localStorageUtils";

const BlogPostPage = ({ params }) => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false)
  const mobile = useMediaQuery('(max-width:768px)')


  useEffect(() => {
    async function fetchBlog() {
      setLoading(true)
      let userId = ""
      const user = getLocalStorageItems().user
      if (user) userId = user._id
      try {
        const response = await getSingleBlog(`/blog/${params.slug}`, { id: userId })
        setBlog(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog();
  }, []);

  return (
    <main>
      {loading ?
        <PageLoader open={loading} /> :
        <div className={classes.blogpage}>
          {blog && <div className={classes['blogpage-left']}><SingleBlog blog={blog} /></div>}
          {!mobile && blog && <div className={classes["blogpage-right"]}>
            <Attractions />
            <MoreFromAuthor author={blog.author._id} />
            <RelatedBlogs />
          </div>}
        </div>
      }
    </main>
  )
}

export default BlogPostPage
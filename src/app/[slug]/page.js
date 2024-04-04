'use client';
import React from "react";

import classes from './page.module.css'

import InfoLink from "@/components/infolink/InfoLink";
import Attractions from "@/components/attractions/Attractions";
import MoreFromAuthor from "@/components/morefromauthor/MoreFromAuthor";
import RelatedBlogs from "@/components/relatedblogs/RelatedBlogs";
import SingleBlog from "@/components/singleblog/SingleBlog";

const BlogPostPage = ({ params }) => {
  return (
    <main>
      <div className={classes.blogpage}>
        <div className={classes['blogpage-left']}>
          <SingleBlog blogId = {params.slug}/>
        </div>
        <div className={classes["blogpage-right"]}>
          <InfoLink />
          <Attractions />
          <MoreFromAuthor />
          <RelatedBlogs />
        </div>
      </div>
    </main>
  )
}

export default BlogPostPage
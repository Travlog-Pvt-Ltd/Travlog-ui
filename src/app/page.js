'use client';
import React, { useEffect, useState } from "react";

import classes from './page.module.css'

import Blogcard from "@/components/blogcard/Blogcard";
import InfoLink from "@/components/infolink/InfoLink";
import Attractions from "@/components/attractions/Attractions";
import Hero from "@/components/hero/Hero";
import Itineary from "@/components/itineary/Itineary";



export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("https://travlog.onrender.com/blog/all");
        const resData = await response.json();
        setBlogs(resData);
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div className={classes.homepage}>
        <div className={classes['homepage-left']}>
          {blogs.map((blog) => (<Blogcard blog={blog} key={blog._id} />))}
        </div>
        <div className={classes["homepage-right"]}>
          <InfoLink />
          <Attractions />
          <Itineary />
        </div>
      </div>
    </>
  );
}

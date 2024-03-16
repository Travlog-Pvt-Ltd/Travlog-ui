'use client';
import React, { useEffect, useState } from "react";

import classes from './page.module.css'

import Navbar from '@/components/navbar/Navbar';
import Blogcard from "@/components/blogcard/Blogcard";
import InfoLink from "@/components/infolink/InfoLink";
import Attractions from "@/components/attractions/Attractions";


export default function Home() {
  const [blogs, setBlogs] = useState([]);

  try {
    useEffect(() => {
      async function fetchBlogs() {
        const response = await fetch("http://localhost:8080/blog/all");
        const resData = await response.json();
        setBlogs(resData);
      }
      fetchBlogs();
    }, []);
  } catch (err) {
    console.log(err);
  }

  return (
    <main>
      <Navbar isLoggedIn={true}/>
      <div className={classes.homepage}>
        <div className={classes['homepage-left']}>
          {blogs.map((blog) => (<Blogcard blog={blog} key={blog._id} />))}
        </div>
        <div className={classes["homepage-right"]}>
          <InfoLink />
          <Attractions />
        </div>
      </div>
    </main>
  );
}

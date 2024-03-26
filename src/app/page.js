'use client';
import React, { useEffect, useState } from "react";

import classes from './page.module.css'

import Navbar from '@/components/navbar/Navbar';
import Blogcard from "@/components/blogcard/Blogcard";
import InfoLink from "@/components/infolink/InfoLink";
import Attractions from "@/components/attractions/Attractions";
import Hero from "@/components/hero/Hero";
import Itineary from "@/components/itineary/Itineary";



export default function Home() {
  const [blogs, setBlogs] = useState([]);

  try {
    useEffect(() => {
      async function fetchBlogs() {
        const response = await fetch("https://travlog.onrender.com/blog/all");
        const resData = await response.json();
        setBlogs(resData);
      }
      fetchBlogs();
    }, []);
  } catch (err) {
    console.log(err);
  }

  const [scrolled, setScrolled] = useState(false);
  const changescrolled = () => {
    if (window.scrollY >= 280) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changescrolled);
  }, [])

  return (
    <main>
      <Navbar isLoggedIn={true} scrolled={scrolled} search={false}/>
      <Hero scrolled={scrolled} />

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
    </main>
  );
}

'use client';

import React, { useEffect, useState } from "react";

import classes from "./Navbar.module.css";
import Hero from "@/components/hero/Hero";
import ProfileDropdown from "@/components/profiledropdown/ProfileDropdown";

import travlogLogo from "@/assets/images/logo.svg";
import searchLogo from "@/assets/images/search.svg";
import searchWLogo from "@/assets/images/searchw.svg";
import writeLogo from "@/assets/images/write.svg";
import writeWLogo from "@/assets/images/writew.svg";
import accountLogo from "@/assets/images/account.svg";
import accountWLogo from "@/assets/images/accountw.svg";
import notificationLogo from "@/assets/images/notification.svg";
import notificationWLogo from "@/assets/images/notificationw.svg";
import SearchBar from "../searchbar/SearchBar";
import Link from "next/link";

const Navbar = ({ isLoggedIn, scrolled, search }) => {
  const [accountClicked, setAccountClicked] = useState(false);

  return (
    <>
      <div className={scrolled ? `${classes.navbar} ${classes["navbar-bg"]}` : classes["navbar"]}>
        <nav>
          <Link href="/">
            <img className={classes["nav-logo"]} src={travlogLogo.src} alt="Travlog Logo" />
          </Link>
          <ul className={classes["nav-list"]}>
            <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]} ${classes["nav-search-logo"]}`}>
              <img src={scrolled ? searchLogo.src : searchWLogo.src} alt="" />
            </li>
            <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}>
              <img src={scrolled ? writeLogo.src : writeWLogo.src} alt="" />
            </li>
            {isLoggedIn ? (
              <>
                <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}>
                  <img
                    src={scrolled ? notificationLogo.src : notificationWLogo.src}
                    alt=""
                  />
                </li>
                <li
                  className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}
                  onClick={() => setAccountClicked((prev) => !prev)}
                >
                  <img src={scrolled ? accountLogo.src : accountWLogo.src} alt="" />
                </li>
              </>
            ) : (
              <li
                className={
                  scrolled
                    ? `${classes["nav-item"]} ${classes["nav-login"]}`
                    : `${classes["nav-item"]} ${classes["nav-login"]} ${classes["nav-login-w"]}`
                }
              >
                Login
              </li>
            )}
          </ul>
          {accountClicked ? <ProfileDropdown isLoggedIn={isLoggedIn} /> : null}
          {/* <Hero isScrolled={scrolled} /> */}
          {search && <SearchBar scrolled={scrolled} />}
        </nav>
      </div>
    </>
  );
};

export default Navbar;

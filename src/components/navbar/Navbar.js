'use client';

import React, { useEffect, useState } from "react";

import classes from "./Navbar.module.css";
import Hero from "@/components/hero/Hero";
import { useAuth } from "@/context/AuthContext";

import travlogLogo from "@/assets/images/logo.svg";
import searchLogo from "@/assets/images/search.svg";
import searchWLogo from "@/assets/images/searchw.svg";
import writeLogo from "@/assets/images/write.svg";
import writeWLogo from "@/assets/images/writew.svg";
import accountLogo from "@/assets/images/account.svg";
import accountWLogo from "@/assets/images/accountw.svg";
import notificationLogo from "@/assets/images/notification.svg";
import notificationWLogo from "@/assets/images/notificationw.svg";
import Login from "../auth/Login";
import Link from "next/link";

const Navbar = () => {
  const [accountClicked, setAccountClicked] = useState(false);
  const {openLogin, setOpenLogin, isLoggedIn, setIsLoggedIn} = useAuth()

  const [color, setColor] = useState(false);
  const changeColor = () => {
    // if (window.scrollY >= 280) {
    //   setColor(true);
    // } else {
    //   setColor(false);
    // }
  };

  // window.addEventListener("scroll", changeColor);

  return (
    <>
      <div className={classes["navbar"]}>
        <nav>
          <Link href="/">
            <img className={classes["nav-logo"]} src={travlogLogo.src} alt="Travlog Logo" />
          </Link>
          <ul className={classes["nav-list"]}>
            <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]} ${classes["nav-search-logo"]}`}>
              <img src={searchLogo.src} alt="" />
            </li>
            <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}>
              <img src={writeLogo.src } alt="" />
            </li>
            {isLoggedIn ? (
              <>
                <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}>
                  <img
                    src={notificationLogo.src }
                    alt=""
                  />
                </li>
                <li
                  className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}
                  onClick={() => setAccountClicked((prev) => !prev)}
                >
                  <img src={accountLogo.src } alt="" />
                </li>
              </>
            ) : (
              <li
                className={`${classes["nav-item"]} ${classes["nav-login"]}`
                }
                onClick={()=>setOpenLogin(true)}
              >
                Login
              </li>
            )}
          </ul>
          {/* {accountClicked ? <ProfileDropdown isLoggedIn={isLoggedIn} /> : null} */}
          {/* {color ? <div className="search-container">
            <SearchBar />
          </div> : null} */}
        </nav>
      </div>
      {/* <Hero  /> */}
      {openLogin && <Login openLogin={openLogin} closeLogin={() => setOpenLogin(false)} />}
    </>
  );
};

export default Navbar;

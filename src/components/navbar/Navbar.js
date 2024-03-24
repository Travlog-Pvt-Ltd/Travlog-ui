'use client';

import React, { useState } from "react";

import "./Navbar.css";
import Hero from "@/components/hero/Hero";
import SearchBar from "../searchbar/SearchBar";
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
import ProfileDropdown from "../profiledropdown/ProfileDropdown";
import Login from "../auth/Login";

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
      <div className={color ? "navbar navbar-bg" : "navbar"}>
        <nav>
          <img className="nav-logo" src={travlogLogo.src} alt="Travlog Logo" />
          <ul className="nav-list">
            <li className="nav-item nav-item-logo nav-search-logo">
              <img src={color ? searchLogo.src : searchWLogo.src} alt="" />
            </li>
            <li className="nav-item nav-item-logo">
              <img src={color ? writeLogo.src : writeWLogo.src} alt="" />
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item nav-item-logo">
                  <img
                    src={color ? notificationLogo.src : notificationWLogo.src}
                    alt=""
                  />
                </li>
                <li
                  className="nav-item nav-item-logo"
                  onClick={() => setAccountClicked((prev) => !prev)}
                >
                  <img src={color ? accountLogo.src : accountWLogo.src} alt="" />
                </li>
              </>
            ) : (
              <li
                className={
                  color
                    ? "nav-item nav-login"
                    : "nav-item nav-login nav-login-w"
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
      <Hero isScrolled={color} />
      {openLogin && <Login openLogin={openLogin} closeLogin={() => setOpenLogin(false)} />}
    </>
  );
};

export default Navbar;

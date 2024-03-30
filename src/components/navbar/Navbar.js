'use client';

import { useEffect, useState } from "react";

import classes from "./Navbar.module.css";
import { useAuth } from "@/context/AuthContext";

import travlogLogo from "@/assets/logos/logo.svg";
import searchLogo from "@/assets/logos/search.svg";
import searchWLogo from "@/assets/logos/searchw.svg";
import writeLogo from "@/assets/logos/write.svg";
import writeWLogo from "@/assets/logos/writew.svg";
import accountLogo from "@/assets/logos/account.svg";
import accountWLogo from "@/assets/logos/accountw.svg";
import notificationLogo from "@/assets/logos/notification.svg";
import notificationWLogo from "@/assets/logos/notificationw.svg";
import Login from "../auth/Login";
import Link from "next/link";
import { useNavbar } from "@/context/NavbarContext";
import { useMediaQuery } from "@mui/material";
import SearchBar from "../searchbar/SearchBar";
import { usePathname, useRouter } from "next/navigation";


const Navbar = () => {
  const { openLogin, setOpenLogin, isLoggedIn } = useAuth()
  const { showSearch } = useNavbar()
  const router = useRouter()
  const mobile = useMediaQuery('(max-width:768px)')
  const pathname = usePathname()
  const [accountClicked, setAccountClicked] = useState(false)
  const [showFullNavbar, setShowFullNavbar] = useState()

  useEffect(() => {
    if (mobile) setShowFullNavbar(true)
    else if (pathname !== '/') setShowFullNavbar(true)
    else if (pathname === '/' && showSearch) setShowFullNavbar(true)
    else setShowFullNavbar(false)
  }, [pathname, showSearch, mobile])

  const handleCreateClick = () => {
    if(isLoggedIn) router.push('/create')
    else setOpenLogin(true)
  }

  return (
    <>
      <div className={`${classes["navbar"]} ${showFullNavbar && classes["navbar-bg"]}`}>
        <nav>
          <div className={classes['navbar-left']}>
            <Link href="/">
              <img className={classes["nav-logo"]} src={travlogLogo.src} alt="Travlog Logo" />
            </Link>
            {showFullNavbar && !mobile && <SearchBar />}
          </div>
          <ul className={classes["nav-list"]}>
            {mobile && <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]} ${classes["nav-search-logo"]}`}>
              <img src={searchLogo.src} alt="" />
            </li>}
            <li onClick={handleCreateClick} className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}>
              <img src={showFullNavbar ? writeLogo.src : writeWLogo.src} alt="" />
            </li>
            {isLoggedIn ? (
              <>
                <li className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}>
                  <img
                    src={showFullNavbar ? notificationLogo.src : notificationWLogo.src}
                    alt=""
                  />
                </li>
                <li
                  className={`${classes["nav-item"]} ${classes["nav-item-logo"]}`}
                  onClick={() => setAccountClicked((prev) => !prev)}
                >
                  <img src={showFullNavbar ? accountLogo.src : accountWLogo.src} alt="" />
                </li>
              </>
            ) : (
              <li
                className={`${classes["nav-item"]} ${classes["nav-login"]}`
                }
                onClick={() => setOpenLogin(true)}
              >
                Login
              </li>
            )}
          </ul>
        </nav>
      </div>
      {openLogin && <Login openLogin={openLogin} closeLogin={() => setOpenLogin(false)} />}
    </>
  );
};

export default Navbar;

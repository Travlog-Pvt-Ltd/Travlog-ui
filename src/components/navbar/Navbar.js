'use client';

import { useEffect, useRef, useState } from "react";

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
import { Avatar, useMediaQuery } from "@mui/material";
import SearchBar from "../searchbar/SearchBar";
import { usePathname, useRouter } from "next/navigation";


const Navbar = () => {
  const { openLogin, setOpenLogin, isLoggedIn, setIsLoggedIn } = useAuth()
  const { showSearch } = useNavbar()
  const router = useRouter()
  const mobile = useMediaQuery('(max-width:768px)')
  const pathname = usePathname()
  const [accountClicked, setAccountClicked] = useState(false)
  const [showFullNavbar, setShowFullNavbar] = useState()
  const dropdownRef = useRef(null)
  const avatarRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAccountClicked(false);
      }
    }

    const handleEscPress = (event) => {
      if (event.key === 'Escape') {
        setAccountClicked(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscPress);
    }
  }, []);

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

  const logout = () => {
    localStorage.removeItem('travlogUserToken')
    localStorage.removeItem('travlogUserDetail')
    setIsLoggedIn(false)
    setAccountClicked(false)
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
                  ref={avatarRef}
                >
                  <Avatar src={showFullNavbar ? accountLogo.src : accountWLogo.src} />
                </li>
                {accountClicked && !mobile && <div className={classes['dropdown-list']} ref={dropdownRef}>
                  <Link onClick={()=>setAccountClicked(false)} href="/profile?tab=1">Profile</Link>
                  <Link onClick={()=>setAccountClicked(false)} href="/profile?tab=2">Bookmarks</Link>
                  <Link onClick={()=>setAccountClicked(false)} href="/settings">Settings</Link>
                  <span onClick={logout}>Logout</span>
                </div>}
                {accountClicked && mobile && <div className={classes['dropdown-list']} ref={dropdownRef}>
                  <Link onClick={()=>setAccountClicked(false)} href="/user">Profile</Link>
                  <Link onClick={()=>setAccountClicked(false)} href="/creations">Creations</Link>
                  <Link onClick={()=>setAccountClicked(false)} href="/bookmarks">Bookmarks</Link>
                  <Link onClick={()=>setAccountClicked(false)} href="/Activity">Activity</Link>
                  <Link onClick={()=>setAccountClicked(false)} href="/settings">Settings</Link>
                  <span onClick={logout}>Logout</span>
                </div>}
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

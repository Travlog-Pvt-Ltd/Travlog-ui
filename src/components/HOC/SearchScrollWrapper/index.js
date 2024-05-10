'use client'

import { useNavbar } from "@context/NavbarContext"
import { useEffect, useRef } from "react"
import classes from "./searchScrollWrapper.module.css"


const SearchScrollWrapper = ({children}) => {
    const scrollRef = useRef()
    const { setShowSearch } = useNavbar()
    useEffect(() => {
        const handleScroll = () => {
            const rect = scrollRef.current.getBoundingClientRect()
            const isOutOfScreen = rect.bottom < 0 || rect.top > window.innerHeight
            setShowSearch(isOutOfScreen)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div ref={scrollRef} className={classes.content}>
            {children}
        </div>
    )
}

export default SearchScrollWrapper
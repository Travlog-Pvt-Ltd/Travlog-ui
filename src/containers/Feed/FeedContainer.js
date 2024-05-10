'use client'

import { useMediaQuery } from "@mui/material"
import classes from "./FeedContainer.module.css"
import Blogcard from "@components/blogcard/Blogcard"
import { useCallback, useRef, useState } from "react"
import { getAllBlogs } from "@utils/api"
import ComponentLoader from "@components/loaders/ComponentLoader"
import FeedLoader from "@components/loaders/FeedLoader"

const FeedContainer = ({ initialData }) => {
    const mobile = useMediaQuery('(max-width:768px)')
    const [blogs, setBlogs] = useState(initialData)
    const [skip, setSkip] = useState(10)
    const [hasmore, setHasmore] = useState(initialData.length >= 10)
    const [loading, setLoading] = useState(false)
    const limit = 10
    const observer = useRef()

    async function fetchBlogs() {
        if (!hasmore) return
        setLoading(true)
        try {
            const response = await getAllBlogs('/blog/all', { limit, skip })
            setBlogs(prev => [...prev, ...response?.data])
            setSkip(prev => prev + limit)
            if (response?.data.length < limit) setHasmore(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const lastElementRef = useCallback(node => {
        if (loading || !hasmore) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchBlogs()
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasmore])

    return (
        <>
            {loading && blogs.length===0 && <FeedLoader mobile={mobile} open={loading} />}
            <div className={mobile ? classes['homepage-mobile-left'] : classes['homepage-left']}>
                {blogs.map((blog, index) => {
                    if (blogs.length - 1 === index) {
                        return (
                            <div key={blog._id} ref={lastElementRef} className={classes.blogcard}>
                                <Blogcard blog={blog} setBlogs={setBlogs} />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={blog._id} className={classes.blogcard}>
                                <Blogcard blog={blog} setBlogs={setBlogs} />
                            </div>
                        )
                    }
                })}
                {loading && blogs.length > 0 && mobile && <ComponentLoader />}
                {loading && blogs.length > 0 && !mobile && <FeedLoader />}
            </div>
        </>
    )
}

export default FeedContainer
import { useMediaQuery } from "@mui/material"
import classes from "./FeedContainer.module.css"
import Blogcard from "@/components/blogcard/Blogcard"
import { useCallback, useEffect, useRef, useState } from "react"
import { getAllBlogs } from "@/utils/api"
import ComponentLoader from "@/components/loaders/ComponentLoader"
import PageLoader from "@/components/loaders/PageLoader"

const FeedContainer = () => {
    const mobile = useMediaQuery('(max-width:768px)')
    const [blogs, setBlogs] = useState([])
    const [skip, setSkip] = useState(0)
    const [hasmore, setHasmore] = useState(true)
    const [loading, setLoading] = useState(false)
    const limit = 10
    const observer = useRef()

    async function fetchBlogs() {
        if (!hasmore) return
        setLoading(true)
        try {
            const response = await getAllBlogs('/blog/all', { limit, skip })
            setBlogs(prev => {
                if (skip === 0 && prev.length > 0) return prev
                else return [...prev, ...response.data]
            })
            setSkip(prev => prev + limit)
            if (response.data.length < limit) setHasmore(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

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
            {loading && blogs.length===0 && <PageLoader open={loading} />}
            <div className={mobile ? classes['homepage-mobile-left'] : classes['homepage-left']}>
                {blogs.map((blog, index) => {
                    if (blogs.length - 1 === index) {
                        return (
                            <div ref={lastElementRef} className={classes.blogcard}>
                                <Blogcard blog={blog} key={blog._id} />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className={classes.blogcard}>
                                <Blogcard blog={blog} key={blog._id} />
                            </div>
                        )
                    }
                })}
                {loading && blogs.length > 0 && <ComponentLoader />}
            </div>
        </>
    )
}

export default FeedContainer
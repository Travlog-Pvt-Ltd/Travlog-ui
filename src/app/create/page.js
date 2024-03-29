'use client';

import { useEffect, useRef, useState } from "react";
import classes from "./page.module.css"
import searchLogo from "@/assets/logos/search.svg";
import { createBlog, createDraft, getDraftDetails, searchTags } from "@/utils/api";
import { enqueueSnackbar } from "notistack";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function Create() {
  const { setOpenLogin, isLoggedIn } = useAuth()
  const inputRef = useRef(null)
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailUrl, setThumbnailUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ title: "", content: "", attachments: [] })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(()=>{
    if(!isLoggedIn) {
      setOpenLogin(true)
      router.push("/")
    }
    const draftId = searchParams.get("draftId")
    const fetchDraftDetails = async(draftId) => {
      try {
        const response = await getDraftDetails(`/draft/${draftId}`)
        setData({title: response.data.title, content: response.data.content, attachments: response.data.attachments})
        setThumbnailUrl(response.data.thumbnail)
        setSelectedTags(response.data.tags)
      } catch (error) {
        console.error(error)
        router.push("/create")
      }
    }
    if(draftId){
      fetchDraftDetails(draftId)
    }
  },[])

  const handleSearch = async (e) => {
    setQuery(e.target.value)
    if (e.target.value === "") {
      setSearchResult([])
      return
    }
    try {
      const response = await searchTags('/tags/search', { search: e.target.value })
      setSearchResult(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleTagSelect = (item) => {
    setSelectedTags(prev => [...prev, item.name])
    setQuery("")
    setSearchResult([])
  }

  const handleTagRemove = (tag) => {
    const newTags = selectedTags.filter(el => {
      return el !== tag
    })
    setSelectedTags(newTags)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setSearchResult([])
    }
  }

  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement.closest('.search-result')) {
        setSearchResult([])
      }
    }, 0);
  }

  const handleCreateDraft = async () => {
    const payload = {
      title: data.title,
      content: data.content,
      attachments: data.attachments,
      tags: selectedTags,
      thumbnail: thumbnailUrl
    }
    setLoading(true)
    try {
      const draftId = searchParams.get('draftId')
      const response = await createDraft(`/draft?draftId=${draftId}`, payload)
      if (response.status == 201) {
        enqueueSnackbar("Draft saved!", { variant: "success" })
        router.push("/")
      }
    } catch (error) {
      console.error(error)
      enqueueSnackbar("Error occurred!", { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBlog = async () => {
    const payload = {
      title: data.title,
      content: data.content,
      attachments: data.attachments,
      tags: selectedTags,
      thumbnail: thumbnailUrl
    }
    setLoading(true)
    try {
      const draftId = searchParams.get('draftId')
      const response = await createBlog(`/blog?draftId=${draftId}`, payload)
      if (response.status == 201) {
        enqueueSnackbar("Blog created!", { variant: "success" })
        router.push("/")
      }
    } catch (error) {
      console.error(error)
      enqueueSnackbar("Error occurred!", { variant: "error" })
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={classes.create}>
      <div className={classes['create-left']}>
        <div className={classes.heading}>
          <h2>Write your Blog</h2>
        </div>
        <div className={classes.title}>
          <div className={classes['title-label']}>Title</div>
          <div className={classes['title-value']}>
            <input type="text" placeholder="Enter the title" name="title" value={data.title} onChange={handleChange} />
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes['body-top']}>

          </div>
          <div className={classes['body-bottom']}>
            <textarea placeholder="Start writing your travlog ..." value={data.content} name="content" onChange={handleChange} />
          </div>
        </div>
        <div></div>
      </div>
      <div className={classes['create-right']}>
        <div className={classes.tags}>
          <div className={classes['tags-label']}>Tags</div>
          <div className={classes['tags-value']}>
            <img src={searchLogo.src} alt="" />
            <input value={query} onChange={handleSearch} onKeyDown={handleKeyDown} onBlur={handleBlur} type="text" placeholder="Search tags related to your travlog" />
            {searchResult.length > 0 && <div className={`search-result ${classes['result-list']}`}>
              {searchResult.map(item => {
                if (selectedTags.includes(item.name)) return null
                return <div onMouseDown={() => handleTagSelect(item)} className={classes.result} key={item._id}>{item.name}</div>
              })}
            </div>}
          </div>
        </div>
        <div className={classes['selected-tags-container']}>
          <div style={{ textAlign: "center", width: "100%" }}>{selectedTags.length > 0 ? "Click on the tags to remove" : "Search and select tags to add"}</div>
          <div className={classes['selected-tags-div']}>
            {selectedTags.length > 0 && selectedTags.map(tag => {
              return <span onClick={() => handleTagRemove(tag)} key={tag}>{tag}</span>
            })}
          </div>
        </div>
        <div className={classes.thumbnail}>
          <div className={classes['thumbnail-text']}>
            <div className={classes['thumbnail-label']}>Thumbnail</div>
            <div className={classes['thumbnail-value']}>
              <input value={thumbnailUrl} onChange={(e) => { setThumbnailUrl(e.target.value); setThumbnail(null) }} type="text" placeholder="Add thumbnail url" />
            </div>
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>Or</div>
          <input ref={inputRef} style={{ display: "none" }} type="file" accept="image/*" onChange={(e) => { setThumbnail(e.target.files[0]); setThumbnailUrl("") }} />
          <div onClick={() => inputRef.current.click()} className={`${classes['thumbnail-file']} pointer`}>
            {thumbnail ? thumbnail.name : "Choose thumbnail file"}
          </div>
        </div>
        <div className={classes['btns']}>
          <button onClick={handleCreateDraft} className={`btn ${classes['create-btn']}`}>Save</button>
          <button onClick={handleCreateBlog} className={`btn ${classes['create-btn']}`}>Publish</button>
        </div>
      </div>
    </div>
  )
}
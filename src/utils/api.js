import { get, post, postForm } from './axios'

export const login = async(url, data) => post({url,data})
export const register = async(url, data) => post({url,data})
export const sendOTP = async(url, data) => post({url,data})
export const verifyOTP = async(url, data) => post({url,data})
export const googleLogin = async(url, data) => post({url,data})

export const searchTags = async(url, data) => get({url,data})
export const createDraft = async(url, data) => postForm({url,data})
export const getDraftDetails = async(url) => get({url})
export const createBlog = async(url, data) => postForm({url,data})

export const getAllBlogs = async(url, data) => get({url,data})
export const getSingleBlog = async(url,data) => get({url,data})

export const getMoreFromAuthor = async(url,data) => get({url,data})
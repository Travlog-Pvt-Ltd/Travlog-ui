import { setCookie } from 'cookies-next';
import { get, patch, post, postForm } from './axios';

export const login = async (url, data) => {
  const response = await post({ url, data });
  const { token, refreshToken, user } = response?.data;
  setCookie('travlogUserToken', token);
  setCookie('travlogRefreshToken', refreshToken);
  setCookie('travlogUserDetail', user);
  return response;
};
export const register = async (url, data) => {
  const response = await post({ url, data });
  const { token, refreshToken, user } = response?.data;
  setCookie('travlogUserToken', token);
  setCookie('travlogRefreshToken', refreshToken);
  setCookie('travlogUserDetail', user);
  return response;
};
export const sendOTP = async (url, data) => post({ url, data });
export const verifyOTP = async (url, data) => post({ url, data });
export const googleLogin = async (url, data) => {
  const response = await post({ url, data });
  const { token, refreshToken, user } = response?.data;
  setCookie('travlogUserToken', token);
  setCookie('travlogRefreshToken', refreshToken);
  setCookie('travlogUserDetail', user);
  return response;
};

export const searchTags = async (url, data) => get({ url, data });
export const createDraft = async (url, data) => postForm({ url, data });
export const getDraftDetails = async (url) => get({ url });
export const createBlog = async (url, data) => postForm({ url, data });

export const getAllBlogs = async (url, data) => get({ url, data });
export const getSingleBlog = async (url, data) => get({ url, data });

export const getMoreFromAuthor = async (url, data) => get({ url, data });
export const likeBlog = async (url, data) => {
  const response = await patch({ url, data });
  setCookie('travlogUserDetail', response.data.user);
  return response;
};
export const dislikeBlog = async (url, data) => {
  const response = await patch({ url, data });
  setCookie('travlogUserDetail', response.data.user);
  return response;
};

export const followCreator = async (url, data) => patch({ url, data });
export const unfollowCreator = async (url, data) => patch({ url, data });

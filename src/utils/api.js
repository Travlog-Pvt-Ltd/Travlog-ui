import { setCookie } from 'cookies-next';
import { get, patch, post, postForm } from './axios';
const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
import CryptoJS from 'crypto-js';

export const login = async (url, data) => {
  const response = await post({ url, data });
  const { token, refreshToken, user } = response?.data;
  setCookie('travlogUserToken', CryptoJS.AES.encrypt(token, secret).toString());
  setCookie(
    'travlogRefreshToken',
    CryptoJS.AES.encrypt(refreshToken, secret).toString()
  );
  setCookie(
    'travlogUserDetail',
    CryptoJS.AES.encrypt(JSON.stringify(user), secret).toString()
  );
  return response;
};
export const register = async (url, data) => {
  const response = await post({ url, data });
  const { token, refreshToken, user } = response?.data;
  setCookie('travlogUserToken', CryptoJS.AES.encrypt(token, secret).toString());
  setCookie(
    'travlogRefreshToken',
    CryptoJS.AES.encrypt(refreshToken, secret).toString()
  );
  setCookie(
    'travlogUserDetail',
    CryptoJS.AES.encrypt(JSON.stringify(user), secret).toString()
  );
  return response;
};
export const sendOTP = async (url, data) => post({ url, data });
export const verifyOTP = async (url, data) => post({ url, data });
export const googleLogin = async (url, data) => {
  const response = await post({ url, data });
  const { token, refreshToken, user } = response?.data;
  setCookie('travlogUserToken', CryptoJS.AES.encrypt(token, secret).toString());
  setCookie(
    'travlogRefreshToken',
    CryptoJS.AES.encrypt(refreshToken, secret).toString()
  );
  setCookie(
    'travlogUserDetail',
    CryptoJS.AES.encrypt(JSON.stringify(user), secret).toString()
  );
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
  setCookie(
    'travlogUserDetail',
    CryptoJS.AES.encrypt(JSON.stringify(response.data.user), secret).toString()
  );
  return response;
};
export const dislikeBlog = async (url, data) => {
  const response = await patch({ url, data });
  setCookie(
    'travlogUserDetail',
    CryptoJS.AES.encrypt(JSON.stringify(response.data.user), secret).toString()
  );
  return response;
};

export const followCreator = async (url, data) => patch({ url, data });
export const unfollowCreator = async (url, data) => patch({ url, data });

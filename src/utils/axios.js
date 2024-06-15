import axios from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';
import {
  getRefreshTokenFromCookie,
  getTokenFromCookie,
  getUserDetailFromCookie,
} from './localStorageUtils';
import CryptoJS from 'crypto-js';

const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAuthorizationHeaders = () => {
  const token = getTokenFromCookie();
  if (!token) return {};
  return { authorization: `Bearer ${token}` };
};

const logout = async () => {
  try {
    const user = getUserDetailFromCookie();
    if (user?._id) {
      const data = { userId: user._id };
      await axios.post(base_url + '/auth/logout', data);
    }
  } catch (error) {
    throw error;
  } finally {
    deleteCookie('travlogUserToken');
    deleteCookie('travlogRefreshToken');
    deleteCookie('travlogUserDetail');
  }
};

const getRefresh = async () => {
  try {
    const refreshToken = getRefreshTokenFromCookie();
    const data = { token: refreshToken };
    console.log(data);
    const response = await axios.post(base_url + '/auth/refresh', data);
    const { token, refToken, user } = response.data;
    setCookie(
      'travlogUserToken',
      CryptoJS.AES.encrypt(token, secret).toString()
    );
    setCookie(
      'travlogRefreshToken',
      CryptoJS.AES.encrypt(refToken, secret).toString()
    );
    setCookie(
      'travlogUserDetail',
      CryptoJS.AES.encrypt(JSON.stringify(user), secret).toString()
    );
    return true;
  } catch (error) {
    await logout();
    throw error;
  }
};

const get = async ({ url, data }) => {
  const authHeader = getAuthorizationHeaders();
  try {
    const response = await axios.get(base_url + url, {
      params: data,
      headers: authHeader,
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      const res = await getRefresh();
      if (res) {
        const authHeader = getAuthorizationHeaders();
        try {
          const response = await axios.get(base_url + url, {
            params: data,
            headers: authHeader,
          });
          return response;
        } catch (error) {
          throw error;
        }
      }
    } else {
      throw error;
    }
  }
};

const post = async ({ url, data }) => {
  const authHeader = getAuthorizationHeaders();
  try {
    const response = await axios.post(base_url + url, data, {
      headers: authHeader,
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      const res = await getRefresh();
      if (res) {
        const authHeader = getAuthorizationHeaders();
        try {
          const response = await axios.post(base_url + url, data, {
            headers: authHeader,
          });
          return response;
        } catch (error) {
          throw error;
        }
      }
    } else {
      throw error;
    }
  }
};

const postForm = async ({ url, data }) => {
  const authHeader = getAuthorizationHeaders();
  authHeader['Content-Type'] = 'multipart/form-data';
  try {
    const response = await axios.post(base_url + url, data, {
      headers: authHeader,
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      const res = await getRefresh();
      if (res) {
        const authHeader = getAuthorizationHeaders();
        authHeader['Content-Type'] = 'multipart/form-data';
        try {
          const response = await axios.post(base_url + url, data, {
            headers: authHeader,
          });
          return response;
        } catch (error) {
          throw error;
        }
      }
    } else {
      throw error;
    }
  }
};

const patch = async ({ url, data }) => {
  const authHeader = getAuthorizationHeaders();
  try {
    const response = await axios.patch(base_url + url, data, {
      headers: authHeader,
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      const res = await getRefresh();
      if (res) {
        const authHeader = getAuthorizationHeaders();
        try {
          const response = await axios.patch(base_url + url, data, {
            headers: authHeader,
          });
          return response;
        } catch (error) {
          throw error;
        }
      }
    } else {
      throw error;
    }
  }
};

const remove = async ({ url }) => {
  const authHeader = getAuthorizationHeaders();
  try {
    const response = await axios.delete(base_url + url, {
      headers: authHeader,
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      console.log(403);
      const res = await getRefresh();
      console.log('refresh -> ', res);
      if (res) {
        const authHeader = getAuthorizationHeaders();
        try {
          const response = await axios.delete(base_url + url, {
            headers: authHeader,
          });
          return response;
        } catch (error) {
          throw error;
        }
      }
    } else {
      throw error;
    }
  }
};

export { get, post, postForm, patch, remove, logout };

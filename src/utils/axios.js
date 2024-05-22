import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAuthorizationHeaders = () => {
  const token = getCookie('travlogUserToken');
  if (!token) return {};
  return { authorization: `Bearer ${token}` };
};

const logout = async () => {
  try {
    let user = getCookie('travlogUserDetail');
    if (user) {
      user = JSON.parse(user);
      if (user?._id) {
        const data = { userId: user._id };
        await axios.post(base_url + '/auth/logout', data);
      }
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
    const refreshToken = getCookie('travlogRefreshToken');
    const data = { token: refreshToken };
    const response = await axios.post(base_url + '/auth/refresh', data);
    const { token, refToken, user } = response.data;
    setCookie('travlogUserToken', token);
    setCookie('travlogRefreshToken', refToken);
    setCookie('travlogUserDetail', user);
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
    if (error.response.status === 403) {
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
    if (error.response.status === 403) {
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
    if (error.response.status === 403) {
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
    if (error.response.status === 403) {
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

const remove = async ({ url, data }) => {
  const authHeader = getAuthorizationHeaders();
  try {
    const response = await axios.delete(base_url + url, data, {
      headers: authHeader,
    });
    return response;
  } catch (error) {
    if (error.response.status === 403) {
      const res = await getRefresh();
      if (res) {
        const authHeader = getAuthorizationHeaders();
        try {
          const response = await axios.delete(base_url + url, data, {
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

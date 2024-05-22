const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
import { deleteCookie, getCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';

export const getTokenFromCookie = () => {
  try {
    let token = getCookie('travlogUserToken');
    if (token) {
      const tokenBytes = CryptoJS.AES.decrypt(token, secret);
      token = tokenBytes.toString(CryptoJS.enc.Utf8);
    }
    return token;
  } catch (error) {
    deleteCookie('travlogUserToken');
    deleteCookie('travlogUserDetail');
    window.location.pathname = '/';
  }
};

export const getUserDetailFromCookie = () => {
  try {
    let user = getCookie('travlogUserDetail');
    if (user) {
      const userBytes = CryptoJS.AES.decrypt(user, secret);
      user = JSON.parse(userBytes.toString(CryptoJS.enc.Utf8));
    }
    return user;
  } catch (error) {
    deleteCookie('travlogUserToken');
    deleteCookie('travlogUserDetail');
    window.location.pathname = '/';
  }
};

export const getRefreshTokenFromCookie = () => {
  try {
    let refresh = getCookie('travlogRefreshToken');
    if (refresh) {
      const bytes = CryptoJS.AES.decrypt(refresh, secret);
      refresh = bytes.toString(CryptoJS.enc.Utf8);
    }
    return refresh;
  } catch (error) {
    localStorage.removeItem('travlogRefreshToken');
    window.location.pathname = '/';
  }
};

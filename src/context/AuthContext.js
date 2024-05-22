'use client';

import { getCookie } from 'cookies-next';
import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const detail = getCookie('travlogUserDetail');
    if (detail) {
      setIsLoggedIn(true);
      setUser(JSON.parse(detail));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        openLogin,
        setOpenLogin,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

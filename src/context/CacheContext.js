'use client';

import { createContext, useContext, useState } from 'react';
const CacheContext = createContext();

function CacheProvider({ children }) {
  const [comments, setComments] = useState([]);

  return (
    <CacheContext.Provider value={{ comments, setComments }}>
      {children}
    </CacheContext.Provider>
  );
}

export const useCache = () => {
  return useContext(CacheContext);
};

export default CacheProvider;

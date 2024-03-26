'use client';

import { createContext, useContext, useEffect, useState } from "react"
const AuthContext = createContext()

function AuthProvider({children}){
    const [openLogin, setOpenLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        const auth = localStorage.getItem("travlogUserToken")
        if(auth){
            setIsLoggedIn(true)
        }
    })

    return (
        <AuthContext.Provider value={{openLogin, setOpenLogin, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider
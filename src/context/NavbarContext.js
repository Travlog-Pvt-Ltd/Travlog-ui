'use client';

import { createContext, useContext, useEffect, useState } from "react"
const NavbarContext = createContext()

function NavbarProvider({children}){
    const [showSearch, setShowSearch] = useState(false)

    return (
        <NavbarContext.Provider value={{showSearch, setShowSearch}}>
            {children}
        </NavbarContext.Provider>
    )
}

export const useNavbar = () => {
    return useContext(NavbarContext)
}

export default NavbarProvider
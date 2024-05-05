import { useState } from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

import "./Login.css"
import CustomDrawer from "@components/CustomElements/Drawer"
import LoginComp from './Comps/LoginComp';
import RegisterComp from './Comps/RegisterComp';
import { app } from '@utils/firebase.config';
import { googleLogin } from '@utils/api';
import { useAuth } from '@context/AuthContext';
import { enqueueSnackbar } from 'notistack';
import { setLocalStorageItems } from '@utils/localStorageUtils';

const LoginDrawer = ({ openDrawer, setOpenDrawer, position, mobile }) => {
    const [register, setRegister] = useState(false)
    const { setIsLoggedIn, setUser } = useAuth()

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const response = await googleLogin('/auth/login/google-login', { email: result.user.email, name: result.user.displayName, oAuthToken: result.user.accessToken, profileImage: result.user.photoURL })
            console.log(response);
            setLocalStorageItems(response.data)
            setIsLoggedIn(true)
            setUser(response.data.user)
            setOpenDrawer(false)
            enqueueSnackbar("Google login successful!", { variant: "success" })
        } catch (error) {
            console.error(error)
            enqueueSnackbar("Google login failed!", { variant: "error" })
        }
    }
    return (
        <CustomDrawer
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            position={position}
            mobile={mobile}
        >
            <div className='login-drawer'>
                {register ?
                    <RegisterComp changeView={() => setRegister(false)} closeLogin={()=>setOpenDrawer(false)} handleGoogleLogin={handleGoogleLogin} />
                    :
                    <LoginComp changeView={() => setRegister(true)} closeLogin={()=>setOpenDrawer(false)} handleGoogleLogin={handleGoogleLogin} />
                }
            </div>
        </CustomDrawer>
    )
}

export default LoginDrawer
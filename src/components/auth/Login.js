'use client';

import { useState } from 'react';
import Modal from 'react-modal'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

import "./Login.css"
import LoginComp from './Comps/LoginComp';
import RegisterComp from './Comps/RegisterComp';
import { app } from '@/utils/firebase.config';
import { googleLogin } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import { enqueueSnackbar } from 'notistack';


const Login = ({ openLogin, closeLogin }) => {
    const [register, setRegister] = useState(false)
    const {setIsLoggedIn} = useAuth()

    const handleGoogleLogin = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const response = await googleLogin('/auth/login/google-login', {email:result.user.email, name:result.user.displayName, oAuthToken:result.user.accessToken, profileImage:result.user.photoURL})
            console.log(response);
            localStorage.setItem("travlogUserToken", response.data.token)
            localStorage.setItem("travlogUserDetail", JSON.stringify(response.data.user))
            setIsLoggedIn(true)
            closeLogin()
            enqueueSnackbar("Google login successful!", { variant: "success" })
        } catch (error) {
            console.error(error)
            enqueueSnackbar("Google login failed!", { variant: "error" })
        }
    }

    return (
        <Modal
            isOpen={openLogin}
            onRequestClose={closeLogin}
            style={{
                content: {
                    margin: 'auto',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: "column",
                    borderRadius: "12px",
                    boxShadow: '0px 20px 24px -4px #10182814',
                    width: '90%',
                    maxWidth: "475px",
                    height: '50%',
                    zIndex: "10",
                    padding: "30px 40px 50px",
                },
            }}
        >
            <div className='login-container'>
                {register ?
                    <RegisterComp changeView={() => setRegister(false)} closeLogin={closeLogin} handleGoogleLogin={handleGoogleLogin} />
                    :
                    <LoginComp changeView={() => setRegister(true)} closeLogin={closeLogin} handleGoogleLogin={handleGoogleLogin} />
                }
            </div>
        </Modal>
    )
}

export default Login
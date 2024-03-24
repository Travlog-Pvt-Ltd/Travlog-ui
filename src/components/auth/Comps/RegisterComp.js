'use client';

import { useAuth } from "@/context/AuthContext";
import { register, sendOTP, verifyOTP } from "@/utils/api"
import { enqueueSnackbar } from "notistack"
import React, { useEffect, useRef, useState } from "react"


const RegisterComp = ({ changeView, closeLogin, handleGoogleLogin }) => {
    const { setIsLoggedIn } = useAuth()
    const [data, setData] = useState({
        email: "",
        name: "",
        password: ""
    })
    const [show, setShow] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [verified, setVerified] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef([...Array(6)].map(() => React.createRef()))

    useEffect(() => {
        otpSent &&
            inputRefs?.current[0]?.current &&
            inputRefs.current[0]?.current?.focus()
    }, [otpSent])

    const handleChange = (e) => {
        setData(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }

    const handleSendOTP = async () => {
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            enqueueSnackbar('Enter a valid Email Id!', { variant: "error" })
            return
        }
        try {
            const response = await sendOTP('/auth/send-otp', { email: data.email })
            enqueueSnackbar(response.data.message, { variant: "success" })
            setOtpSent(true)
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
        }
    }

    const handleOtpBackspace = (index) => (event) => {
        if (event.key === "Backspace" && index > 0 && otp[index] === "") {
            inputRefs.current[index - 1].current.focus()
        }
    }

    const handleOtpChange = (index) => (e) => {
        const value = e.target.value
        if (isNaN(value)) {
            return
        }
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if (index < 5 && value !== "") {
            inputRefs.current[index + 1].current.focus()
        }
    }

    const handleOtpVerification = async () => {
        const otpNumber = otp.join("")
        try {
            const response = await verifyOTP('/auth/verify-otp', { email: data.email, otp: otpNumber })
            enqueueSnackbar(response.data.message, { variant: "success" })
            setVerified(true)
        } catch (error) {
            console.error(error);
            setOtp(["", "", "", "", "", ""])
            inputRefs.current[0].current.focus()
            enqueueSnackbar(error.message, { variant: "error" })
        }
    }

    const handleRegister = async () => {
        if (!data.password || !data.name) {
            enqueueSnackbar("Please fill all the required fields!", { variant: "error" })
            return
        }
        try {
            const response = await register("/auth/register", data)
            localStorage.setItem("travlogUserToken", response.data.token)
            localStorage.setItem("travlogUserDetail", JSON.stringify(response.data.user))
            setIsLoggedIn(true)
            closeLogin()
            enqueueSnackbar("Registered successfully!", { variant: "success" })
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: "error" })
        }
    }

    return (
        <>
            {!otpSent &&
                <div className='register-div'>
                    <div className='login-modal-heading heading3'>Register on Travlog</div>
                    <input className='input email-input' type='text' placeholder='Email' value={data.email} name='email' onChange={handleChange} />
                    <button onClick={handleSendOTP} className='btn submit-btn'>SEND OTP</button>
                    <button onClick={handleGoogleLogin} className='btn google-login-btn'>CONTINUE WITH GOOGLE</button>
                    <p className='login-toggle-p'>Already have an account? <span className='link' onClick={changeView}>Login</span></p>
                </div>
            }
            {otpSent && !verified &&
                <div className="enter-otp-div">
                    <div className="login-modal-heading heading3">Enter otp</div>
                    <div className="otp-input-box">
                        {otp.map((item, index) => {
                            return <input key={index} className="input otp-input" type="text" maxLength={1} value={item} onKeyDown={handleOtpBackspace(index)} ref={inputRefs.current[index]} onChange={handleOtpChange(index)} />
                        })}
                    </div>
                    <button onClick={handleOtpVerification} className="btn submit-btn">SUBMIT</button>
                    <p>{data.email} &nbsp; <span onClick={() => setOtpSent(false)} className="link">Change</span></p>
                </div>
            }
            {otpSent && verified &&
                <div className="enter-password">
                    <div>Enter further details to register on Travlog</div>
                    <input className="input name-input" type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange} />
                    <div className="password-box">
                        <input placeholder="Password" className="input password-input" type={show ? "text" : "password"} name="password" value={data.password} onChange={handleChange} />
                        {show ? <span className='pointer' onClick={() => setShow(false)}>Hide</span> : <span className='pointer' onClick={() => setShow(true)}>Show</span>}
                    </div>
                    <button onClick={handleRegister} className="btn submit-btn">SUBMIT</button>
                    <p>{data.email} &nbsp; <span onClick={() => { setVerified(false); setOtpSent(false) }} className="link">Change</span></p>
                </div>
            }
        </>
    )
}

export default RegisterComp
import { post } from './axios'

export const login = async(url, data) => post({url,data})
export const register = async(url, data) => post({url,data})
export const sendOTP = async(url, data) => post({url,data})
export const verifyOTP = async(url, data) => post({url,data})
export const googleLogin = async(url, data) => post({url,data})
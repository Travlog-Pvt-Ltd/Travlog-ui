const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY
import CryptoJS from "crypto-js";

export const getLocalStorageItems = () => {
    let token = localStorage.getItem('travlogUserToken')
    if (token) {
        const tokenBytes = CryptoJS.AES.decrypt(token, secret)
        token = tokenBytes.toString(CryptoJS.enc.Utf8)
    }
    let user = localStorage.getItem("travlogUserDetail")
    if (user) {
        const userBytes = CryptoJS.AES.decrypt(user, secret);
        user = JSON.parse(userBytes.toString(CryptoJS.enc.Utf8))
    }
    return { token, user }
}

export const getRefreshToken = () => {
    let refresh = localStorage.getItem('travlogRefreshToken')
    if (refresh) {
        const bytes = CryptoJS.AES.decrypt(refresh, secret);
        refresh = bytes.toString(CryptoJS.enc.Utf8)
    }
    return refresh
}

export const setLocalStorageItems = ({ token, refreshToken, user }) => {
    if (token) localStorage.setItem("travlogUserToken", CryptoJS.AES.encrypt(token, secret).toString())
    if (refreshToken) localStorage.setItem("travlogRefreshToken", CryptoJS.AES.encrypt(refreshToken, secret).toString())
    if (user) localStorage.setItem("travlogUserDetail", CryptoJS.AES.encrypt(JSON.stringify(user), secret).toString())
}
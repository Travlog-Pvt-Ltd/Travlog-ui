import axios from 'axios'
import { getLocalStorageItems, getRefreshToken, setLocalStorageItems } from './localStorageUtils'
const base_url = 'http://localhost:8080'

const getAuthorizationHeaders = () => {
    const token = getLocalStorageItems().token
    if (!token) return {}
    return { authorization: `Bearer ${token}` }
}

const logout = async () => {
    try {
        const user = getLocalStorageItems().user
        if (user) {
            const id = JSON.parse(user)._id
            await axios.post(base_url + '/auth/logout', data = { userId: id })
        }
    } catch (error) {
        throw error
    }
    finally {
        localStorage.removeItem("travlogUserToken")
        localStorage.removeItem("travlogRefreshToken")
        localStorage.removeItem("travlogUserDetail")
    }
}

const getRefresh = async () => {
    try {
        const refreshToken = getRefreshToken()
        const data = { token: refreshToken }
        const response = await axios.post(base_url + '/auth/refresh', data)
        setLocalStorageItems(response.data)
        return true
    } catch (error) {
        await logout()
        throw error
    }
}

const get = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.get(base_url + url, { params: data, headers: authHeader })
        return response
    } catch (error) {
        if (error.response.status === 403) {
            const res = await getRefresh()
            if (res) {
                const authHeader = getAuthorizationHeaders()
                try {
                    const response = await axios.get(base_url + url, { params: data, headers: authHeader })
                    return response
                } catch (error) {
                    throw error
                }
            }
        }
        else {
            throw error
        }
    }
}

const post = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.post(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        if (error.response.status === 403) {
            const res = await getRefresh()
            if (res) {
                const authHeader = getAuthorizationHeaders()
                try {
                    const response = await axios.post(base_url + url, data, { headers: authHeader })
                    return response
                } catch (error) {
                    throw error
                }
            }
        }
        else {
            throw error
        }
    }
}

const postForm = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    authHeader['Content-Type'] = 'multipart/form-data'
    try {
        const response = await axios.post(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        if (error.response.status === 403) {
            const res = await getRefresh()
            if (res) {
                const authHeader = getAuthorizationHeaders()
                authHeader['Content-Type'] = 'multipart/form-data'
                try {
                    const response = await axios.post(base_url + url, data, { headers: authHeader })
                    return response
                } catch (error) {
                    throw error
                }
            }
        }
        else {
            throw error
        }
    }
}

const patch = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.patch(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        if (error.response.status === 403) {
            const res = await getRefresh()
            if (res) {
                const authHeader = getAuthorizationHeaders()
                try {
                    const response = await axios.patch(base_url + url, data, { headers: authHeader })
                    return response
                } catch (error) {
                    throw error
                }
            }
        }
        else {
            throw error
        }
    }
}

const remove = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.delete(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        if (error.response.status === 403) {
            const res = await getRefresh()
            if (res) {
                const authHeader = getAuthorizationHeaders()
                try {
                    const response = await axios.delete(base_url + url, data, { headers: authHeader })
                    return response
                } catch (error) {
                    throw error
                }
            }
        }
        else {
            throw error
        }
    }
}

export { get, post, postForm, patch, remove, logout }

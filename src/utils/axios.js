import axios from 'axios'
const base_url = 'https://backend-travlog.vercel.app/'

const getAuthorizationHeaders = () => {
    const token = localStorage.getItem("travlogUserToken")
    if (!token) return {}
    return { authorization: `Bearer ${token}` }
}

const get = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.get(base_url + url, { params: data, headers: authHeader })
        return response
    } catch (error) {
        throw error
    }
}

const post = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.post(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        throw error
    }
}

const postForm = async({url,data}) => {
    const authHeader = getAuthorizationHeaders()
    authHeader['Content-Type'] = 'multipart/form-data'
    try {
        const response = await axios.post(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        throw error
    }
}

const patch = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.patch(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        throw error
    }
}

const remove = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    try {
        const response = await axios.delete(base_url + url, data, { headers: authHeader })
        return response
    } catch (error) {
        throw error
    }
}

export { get, post, postForm, patch, remove }

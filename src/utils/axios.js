import axios from 'axios'
const base_url='http://localhost:8080'

const getAuthorizationHeaders = () => {
    const token = localStorage.getItem("platinumRxDashboardToken")
    if (!token) return {}
    return { Authorization: `Bearer ${token}` }
}

const get = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    const response = await axios.get( base_url+url, {params:data, authHeader})
    return response
}

const post = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    const response = await axios.post( base_url+url, data, {authHeader})
    return response
}

const patch = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    const response = await axios.patch( base_url+url, data, {authHeader})
    return response
}

const remove = async ({ url, data }) => {
    const authHeader = getAuthorizationHeaders()
    const response = await axios.delete( base_url+url, data, {authHeader})
    return response
}

export {get, post, patch, remove}
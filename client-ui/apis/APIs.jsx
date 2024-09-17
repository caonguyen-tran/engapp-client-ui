import axios from "axios";

const BASE_URL = "http://192.168.1.29:8080"
const user_service = "/user-service"

export const endpoints = {
    "user-service": {
        "user-login": `${user_service}/user/login`,
        "user-register": `${user_service}/user/register-user`
    }
}

export const authApi = (accessToken) => axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: BASE_URL
})



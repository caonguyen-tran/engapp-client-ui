import axios from "axios";

const BASE_URL = "http://192.168.1.29:8088/api"
const user_service = "/user-service"
const collection_service = "/collection-service"
const word_service = "/word-service"
const quiz_service = "/quiz-service"

export const endpoints = {
    "user-service": {
        "user-login": `${user_service}/user/login`,
        "user-register": `${user_service}/user/register-user`
    },
    "collection-service": {
        "get-all": ``
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



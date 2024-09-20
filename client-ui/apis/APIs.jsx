import axios from "axios";

const BASE_URL = "http://192.168.1.29:8088/api"
const user_service = "/user-service"
const collection_service = "/collection-service"
const word_service = "/word-service"
const quiz_service = "/quiz-service"
const security_service = "/security-service"

export const endpoints = {
    "user-service": {
        "user-login": `${user_service}/user/login`,
        "user-register": `${user_service}/user/register-user`
    },
    "collection-service": {
        "get-all": (pageNo) => `${collection_service}/collection/all?pageNo=${pageNo}`,
        "get-my-collection": `${collection_service}/collection/list/my-collection`,
        "inspect-owner": (collectionId) => `${collection_service}/collection/inspect-owner/${collectionId}`,
        "download-collection": (collectionId) => `${collection_service}/download/create?collectionId=${collectionId}`,
        "get-downloaded": `${collection_service}/download/get-list-owner`
    },
    "word-service":{
        "get-words-by-collection": (collectionId) => `${word_service}/word/list-words?collectionId=${collectionId}`,
        "create-word": `${word_service}/word/create`,
        "get-list-by-review": (isReview) => `${word_service}/learned-word/get-by-review?isReview=${isReview}`,
        "get-list-by-collection": (collectionId) => `${word_service}/learned-word/get-by-collection?collectionId=${collectionId}`
    },
    "security-service": {
        "validate-token": `${security_service}/auth/introspect`
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



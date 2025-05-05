import axios from "axios";

const BASE_URL = "http://34.29.166.181:8088/api";
const AI_URL = "http://34.29.166.181:5001";
const user_service = "/user-service";
const collection_service = "/collection-service";
const word_service = "/word-service";
const quiz_service = "/quiz-service";
const security_service = "/security-service";
const blog_service = "/blog-service"

export const endpoints = {
  "user-service": {
    // "user-login": `${user_service}/user/login`,
    "user-register": `${user_service}/user/register-user`,
    "information": `${user_service}/user/information`
  },
  "collection-service": {
    "get-all": (pageNo) =>
      `${collection_service}/collection/all?pageNo=${pageNo}`,
    "get-my-collection": `${collection_service}/collection/list/my-collection`,
    "inspect-owner": (collectionId) =>
      `${collection_service}/collection/inspect-owner/${collectionId}`,
    "download-collection": (collectionId) =>
      `${collection_service}/download/create?collectionId=${collectionId}`,
    "get-downloaded": `${collection_service}/download/get-list-owner`,
    "remove-downloaded": (downloadId) => `${collection_service}/download/remove/${downloadId}`
  },
  "word-service": {
    "get-words-by-collection": (collectionId) =>
      `${word_service}/word/list-words?collectionId=${collectionId}`,
    "create-word": `${word_service}/word/create`,
    "get-list-by-review": (isReview) =>
      `${word_service}/learned-word/get-by-review?isReview=${isReview}`,
    "get-list-by-collection": (collectionId) =>
      `${word_service}/learned-word/get-by-collection?collectionId=${collectionId}`,
    "get-list-non-active-in-collection": (collectionId) =>
      `${word_service}/learned-word/get-list-non-learned?isReview=false&isLearn=false&collectionId=${collectionId}`,
    "learn-first-time": `${word_service}/learned-word/learn-first-time`,
    "update-list-word": `${word_service}/learned-word/update-list-word`,
  },
  "security-service": {
    "get-token": `${security_service}/auth/token`,
    "validate-token": `${security_service}/auth/introspect`,
  },
  "quiz-service": {
    "get-all-question-set": `${quiz_service}/question-set/get-all`,
    "do-question-set": (questionSetId) =>
      `${quiz_service}/question-set/do-question-set/${questionSetId}`,
    "re-do-question-set": (questionSetId) =>
      `${quiz_service}/question-set/re-do-question-set/${questionSetId}`,
    "re-do-quiz-result": (resultId) =>
      `${quiz_service}/question-set/re-do-quiz-result/${resultId}`,
    "list-by-question-set": (questionSetId) =>
      `${quiz_service}/question/list-by-question-set/${questionSetId}`,
    "list-by-owner": `${quiz_service}/quiz-result/get-list-by-owner`,
    "list-exam-by-result": (resultId) => `${quiz_service}/exam-responses/get-result/${resultId}`,
    "submit-quiz": `${quiz_service}/exam-responses/submit-quiz`,
    "get-quiz-result": (resultId) => `${quiz_service}/quiz-result/get-result/${resultId}`
  },
  "blog-service": {
    "get-all": `${blog_service}/blog/get-blogs`,
    "get-by-id": (id) => `${blog_service}/blog/get-blog/${id}`
  },
  "blog-analyze-service": {
    "analyze-text": `/analyze-text`,
    "translate": "/translate"
  },
  "image-recognition-service": {
    "get-histories": (userId) => `/get-histories?user_id=${userId}`,
    "get-history-by-id": (historyId) => `/get-history/${historyId}`,
    "detect-image": "/detect-image"
  }
};

export const authApi = (accessToken) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const aiApi = axios.create({
  baseURL: AI_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  },
  withCredentials: false
});

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

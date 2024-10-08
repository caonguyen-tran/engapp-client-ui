import axios from "axios";

const BASE_URL = "http://192.168.1.31:8088/api";
const user_service = "/user-service";
const collection_service = "/collection-service";
const word_service = "/word-service";
const quiz_service = "/quiz-service";
const security_service = "/security-service";

export const endpoints = {
  "user-service": {
    "user-login": `${user_service}/user/login`,
    "user-register": `${user_service}/user/register-user`,
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
  },
};

export const authApi = (accessToken) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export default axios.create({
  baseURL: BASE_URL,
});

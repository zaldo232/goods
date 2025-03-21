import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // JWT 인증 등을 위해 필요
});

export default api;

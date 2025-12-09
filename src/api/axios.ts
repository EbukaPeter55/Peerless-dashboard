import axios from "axios";

// Create Axios instance
const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} Request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("[API Error]", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;

import axios from "axios";

// 1. Base Configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

// 2. Request Interceptor
// This will check for a token in localStorage before every request.
// If it exists, it will automatically add the 'Authorization' header.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

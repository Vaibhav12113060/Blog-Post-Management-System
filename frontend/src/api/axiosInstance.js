import axios from "axios";

// 1. Base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

// 2. Request Interceptor (Confidence booster!)
// Ye har request se pehle check karega ki localStorage mein token hai ya nahi.
// Agar hai, toh automatically 'Authorization' header jod dega.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4499/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ Fix: Ensure "Bearer" is added
  }
  return config;
});

export default API;

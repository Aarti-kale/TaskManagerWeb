import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanagerweb-lslg.onrender.com/api",
});

// If token exists, attach it
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

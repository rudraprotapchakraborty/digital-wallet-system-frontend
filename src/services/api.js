import axios from "axios";

const api = axios.create({
  baseURL: "https://digital-wallet-system-backend-nine.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("wallet_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

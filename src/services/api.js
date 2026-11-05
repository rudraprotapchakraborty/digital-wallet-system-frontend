import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "/api" : "https://digital-wallet-system-backend-nine.vercel.app/api"),
  timeout: 15000,
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem("wallet_token");
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});
api.interceptors.response.use(response => response, error => {
  const used = error.config?.headers?.Authorization;
  if (error.response?.status === 401 && used === "Bearer " + localStorage.getItem("wallet_token") && !["/auth/login", "/auth/google"].includes(error.config?.url)) {
    localStorage.removeItem("wallet_token");
    localStorage.removeItem("wallet_user");
    window.dispatchEvent(new Event("wallet-session-ended"));
  }
  return Promise.reject(error);
});
export default api;

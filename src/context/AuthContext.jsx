import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

function cachedUser() {
  try { return localStorage.getItem("wallet_token") ? JSON.parse(localStorage.getItem("wallet_user")) : null; }
  catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(cachedUser);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("wallet_token")));

  function setUser(next) {
    if (next) localStorage.setItem("wallet_user", JSON.stringify(next));
    else localStorage.removeItem("wallet_user");
    setUserState(next);
  }

  useEffect(() => {
    const token = localStorage.getItem("wallet_token");
    let active = true;
    const sync = () => setUserState(cachedUser());
    window.addEventListener("storage", sync);
    window.addEventListener("wallet-session-ended", sync);
    if (token) api.get("/auth/me").then(({ data }) => {
      if (active && token === localStorage.getItem("wallet_token")) setUser(data.user);
    }).catch(() => {}).finally(() => { if (active) setLoading(false); });
    return () => {
      active = false;
      window.removeEventListener("storage", sync);
      window.removeEventListener("wallet-session-ended", sync);
    };
  }, []);

  async function authenticate(path, fields) {
    const { data } = await api.post(path, fields);
    if (data.requiresPhone || data.pendingApproval) return data;
    return acceptSession(data);
  }

  function acceptSession(data) {
    if (!data.token || !data.user?.role) throw new Error("Unexpected sign-in response.");
    localStorage.setItem("wallet_token", data.token);
    setUser(data.user);
    return data.user;
  }

  const login = (identifier, password) => authenticate("/auth/login", { identifier, password });
  const googleLogin = (credential, phone, role) => authenticate("/auth/google", { credential, phone, role });
  const register = fields => api.post("/auth/register", fields);
  function logout() {
    localStorage.removeItem("wallet_token");
    localStorage.removeItem("wallet_tour_done");
    setUser(null);
  }
  return <AuthContext.Provider value={{ user, setUser, acceptSession, loading, login, googleLogin, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

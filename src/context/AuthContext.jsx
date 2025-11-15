import React, { createContext, useContext, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

// Safe JSON parse
const safeParse = (v) => {
  try {
    if (!v || v === "undefined" || v === "null") return null;
    return JSON.parse(v);
  } catch {
    localStorage.removeItem("wallet_user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => safeParse(localStorage.getItem("wallet_user")));
  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // LOGIN (Matches your backend response)
  // ------------------------------------
  const login = async (phone, password) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", { phone, password });

      // Backend returns ONLY: { token, role }
      const { token, role } = res.data;

      if (!token || !role) {
        console.error("INVALID LOGIN RESPONSE:", res.data);
        throw new Error("Invalid login response from server");
      }

      // Construct our own user object
      const userObj = { role };

      localStorage.setItem("wallet_token", token);
      localStorage.setItem("wallet_user", JSON.stringify(userObj));
      setUser(userObj);

      toast.success("Logged in successfully");
      return userObj;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (payload) => {
    try {
      setLoading(true);
      await api.post("/auth/register", payload);
      toast.success("Account created. Please login.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("wallet_token");
    localStorage.removeItem("wallet_user");
    localStorage.removeItem("wallet_tour_done");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

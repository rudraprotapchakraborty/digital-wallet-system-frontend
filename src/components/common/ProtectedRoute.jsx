import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ShieldAlert, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

/**
 * HIGH-END PROTECTED ROUTE
 * Features: 
 * - Seamless Brand Loading State
 * - Intelligent Role Redirection
 * - Motion-based Permission Handlers
 */
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const dark = theme === "dark";

  // 1. BRANDED LOADING STATE
  // Prevents "layout flickers" by showing a premium, centered brand loader
  if (loading) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-500 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex flex-col items-center"
        >
          {/* Pulsing Brand Logo */}
          <div className="relative mb-8">
            <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-500/40 animate-pulse">
              W
            </div>
            <Loader2 className="absolute -bottom-2 -right-2 h-6 w-6 text-blue-500 animate-spin" />
          </div>
          
          <h2 className={`text-sm font-black uppercase tracking-[0.3em] ${
            dark ? "text-white/40" : "text-black/30"
          }`}>
            Authenticating
          </h2>
        </motion.div>
      </div>
    );
  }

  // 2. UNAUTHENTICATED REDIRECT
  // Smoothly kicks users to login while remembering where they tried to go
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, message: "Please sign in to access this area." }}
        replace
      />
    );
  }

  // 3. ROLE-BASED ACCESS CONTROL (RBAC)
  // If user is logged in but lacks the specific permission for this route
  if (roles && !roles.includes(user.role)) {
    // Determine the user's natural "home" based on their existing role
    const fallback =
      user.role === "admin"
        ? "/admin"
        : user.role === "agent"
        ? "/agent"
        : "/user";

    // Instead of just a hard redirect, you could log this attempt or 
    // simply move them to their authorized dashboard.
    return <Navigate to={fallback} replace />;
  }

  // 4. AUTHORIZED CONTENT WRAPPER
  // Renders the children with a subtle fade-in to polish the page entry
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;
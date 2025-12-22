import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for auth to resolve
  if (loading) {
    return null; // or a spinner if you want
  }

  // Not logged in → redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Logged in but role not allowed
  if (roles && !roles.includes(user.role)) {
    const fallback =
      user.role === "admin"
        ? "/admin"
        : `/${user.role || "user"}`;

    return <Navigate to={fallback} replace />;
  }

  // Allowed → render page
  return <>{children}</>;
};

export default ProtectedRoute;

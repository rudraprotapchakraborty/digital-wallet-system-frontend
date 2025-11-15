import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    const fallback =
      user.role === "admin" ? "/admin" : `/${user.role || "user"}`;
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;

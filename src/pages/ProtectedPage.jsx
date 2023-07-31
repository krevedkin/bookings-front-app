import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "../store/store";

const ProtectedRoute = ({ children }) => {
  const isAuth = authStore((state) => state.isAuthenticated);
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;

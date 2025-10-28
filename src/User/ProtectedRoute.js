import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const rehydrated = useSelector((state) => state._persist?.rehydrated); // Optional check if you track persist state

  // wait for persist to rehydrate before deciding
  if (rehydrated === false) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location)

  useEffect(() => {
    if (isAuthenticated && (location.pathname === "/sinin" || location.pathname === "/signup")) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (isAuthenticated) {
    return children;
  }
  if (!isAuthenticated) {
    return <Navigate to="/sigin" replace />;
  }

  return children;
};

export default ProtectedRoute;

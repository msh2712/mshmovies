import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
  if (isAuthenticated && (location.pathname === "/signin" || location.pathname === "/signup")) {
     navigate("/", { replace: true });
  }
}, [isAuthenticated, location.pathname, navigate]);




 
  

  return children;
};

export default PublicRoute;

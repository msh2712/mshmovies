import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && (location.pathname === "/signin" || location.pathname === "/signup")) {
      toast.info("You are already logged in! Redirecting to home...");
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, location.pathname, navigate]);

 
  

  return children;
};

export default PublicRoute;

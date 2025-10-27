import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import Loading from "../Component/Loading";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isRehydrated = persistor.getState().bootstrapped;

  if (!isRehydrated) {
    return <Loading/>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

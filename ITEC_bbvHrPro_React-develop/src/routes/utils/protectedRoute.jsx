import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthorized }) => {
  if (isAuthorized) return <Outlet />;

  return <Navigate to="/" />;
};

export default ProtectedRoute;

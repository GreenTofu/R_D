import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import authenticationAPI from "api/authenticationAPI";
import SignIn from "pages/signin";
import useUserStore from "store/userStore";
import { setAuthHeader } from "utils/helper";

import HomeRoutes from "./homeRoutes";
import AuthenticatedRoute from "./utils/authenticatedRoute";

const AppRoutes = () => {
  const { setUserAction } = useUserStore();
  const navigate = useNavigate();

  const verifyUser = async () => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const response = await authenticationAPI.verifyUser();
      setUserAction(response?.data);
    } catch (error) {
      navigate("/authentication");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <Routes>
      <Route path="/authentication" element={<SignIn />} />
      <Route element={<AuthenticatedRoute />}>
        <Route path="/*" element={<HomeRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

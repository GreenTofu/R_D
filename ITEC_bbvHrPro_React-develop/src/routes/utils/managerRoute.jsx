
import React from "react";

import useUserStore from "store/userStore";
import { ROLE } from "utils/constant";

import ProtectedRoute from "./protectedRoute";

const ManagerRoute = () => {
  const user = useUserStore((state) => state.user);

  const isManager = user?.id && user?.role === ROLE.MANAGER;

  if (user) return <ProtectedRoute isAuthorized={isManager} />;

  return null;
};

export default ManagerRoute;

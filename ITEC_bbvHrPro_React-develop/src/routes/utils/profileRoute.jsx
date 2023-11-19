import React from "react";
import { useParams } from "react-router-dom";

import useUserStore from "store/userStore";
import { ROLE } from "utils/constant";

import ProtectedRoute from "./protectedRoute";

const ProfileRoute = () => {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);

  const isManager = user?.id && user?.role === ROLE.MANAGER;

  const isCurrentUser = user?.id === parseInt(id);

  if (user)
    return (
      <ProtectedRoute isAuthorized={isManager || isCurrentUser} />
    );
  return null;
};

export default ProfileRoute;

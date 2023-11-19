import React, { useEffect, useState } from "react";

import useUserStore from "store/userStore";

import ProtectedRoute from "./protectedRoute";

const AuthenticatedRoute = () => {
  const user = useUserStore((state) => state.user);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (user) setIsAuthorized(true);
    else setIsAuthorized(false);
  }, [user]);

  if (isAuthorized) return <ProtectedRoute isAuthorized={user?.id} />;

  return null;
};

export default AuthenticatedRoute;

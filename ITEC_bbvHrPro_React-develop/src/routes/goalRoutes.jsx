import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import GoalDashboard from "pages/goals/goalDashboard";
import GoalDetails from "pages/goals/goalDetails";
import GoalList from "pages/goals/goalList";
import useGoalStore from "store/goalStore";
import useUserStore from "store/userStore";
import { ROLE, POSITION } from "utils/constant";

const GoalRoutes = () => {
  const user = useUserStore((state) => state.user);
  const fetchStatusList = useGoalStore(
    (state) => state.fetchStatusList
  );

  const isSUM =
    user?.role === ROLE.MANAGER &&
    user?.position === POSITION.SERVICE_UNIT_MANAGER;

  useEffect(() => {
    fetchStatusList();
  }, []);

  return (
    <Routes>
      {isSUM ? (
        <Route index element={<GoalDashboard />} />
      ) : (
        <Route index element={<GoalList />} />
      )}

      <Route path="/:id" element={<GoalDetails isSUM={isSUM} />} />
    </Routes>
  );
};

export default GoalRoutes;

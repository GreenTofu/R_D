import React from "react";
import { Routes, Route } from "react-router-dom";

import CycleList from "pages/performances/cycleList";

import PerformanceReviewRoutes from "./performanceRoutes";

const ReviewCycleRoutes = () => {
  return (
    <Routes>
      <Route index element={<CycleList />} />

      <Route
        path="cycles/:id/*"
        element={<PerformanceReviewRoutes />}
      />
    </Routes>
  );
};

export default ReviewCycleRoutes;

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

import useReviewCycle from "hooks/useReviewCycle";
import CreatePerformanceReview from "pages/performances/createPerformanceReview";
import ReviewForm from "pages/performances/reviewForm";
import ReviewList from "pages/performances/reviewList";
import useUserStore from "store/userStore";
import { ROLE, POSITION } from "utils/constant";
import { CycleContext } from "utils/context";

const PerformanceReviewRoutes = () => {
  const { id } = useParams();

  const { reviewCycle } = useReviewCycle({ id });

  const user = useUserStore((state) => state.user);
  const isHRM =
    user?.role === ROLE.MANAGER &&
    user?.position === POSITION.HUMAN_RESOURCE_MANAGER;

  return (
    <CycleContext.Provider value={reviewCycle}>
      <Routes>
        <Route index element={<ReviewList isHRM={isHRM} />} />

        <Route path="/reviews/:id" element={<ReviewForm />} />

        {isHRM && (
          <Route
            path="create"
            element={<CreatePerformanceReview />}
          />
        )}
      </Routes>
    </CycleContext.Provider>
  );
};

export default PerformanceReviewRoutes;

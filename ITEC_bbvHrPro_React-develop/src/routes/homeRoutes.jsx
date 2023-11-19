import React from "react";
import { Routes, Route } from "react-router-dom";

import SideBar from "components/sideBar";
import ToastMessage from "components/toastMessage";
import Home from "pages/home";
import GoalRoutes from "routes/goalRoutes";
import ResourceRoutes from "routes/resourceRoutes";
import ReviewCycleRoutes from "routes/reviewCycleRoutes";

const HomeRoutes = () => {
  return (
    <div className="min-h-screen flex bg-neutral-100">
      <SideBar />
      <ToastMessage />
      <div className="my-14 w-[1024px] mx-auto">
        <Routes>
          <Route index element={<Home />} />

          <Route path="/goals/*" element={<GoalRoutes />} />
          <Route path="/resources/*" element={<ResourceRoutes />} />
          <Route
            path="/performances/*"
            element={<ReviewCycleRoutes />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default HomeRoutes;

import React from "react";

import ActiveProjects from "./activeProject";
import AvailabilityStatistic from "./availabilityStatistic";
import ResourceStatistic from "./resourceStatistic";
import UpcomingResources from "./upcomingResource";

const Dashboard = () => {
  return (
    <>
      <div className="pb-8">
        <h1 className="text-xl font-bold">Resource Dashboard</h1>
      </div>

      <div className="flex mb-10">
        <ResourceStatistic />
        <AvailabilityStatistic />
      </div>

      <div className="flex">
        <ActiveProjects />
        <UpcomingResources />
      </div>
    </>
  );
};

export default Dashboard;

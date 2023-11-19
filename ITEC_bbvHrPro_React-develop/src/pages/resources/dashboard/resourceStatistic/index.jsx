import React, { useState, useEffect } from "react";

import dashboardAPI from "api/dashboardAPI";

import StatisticItem from "./statisticItem";

const ResourceStatistic = () => {
  const [statisticData, setStatisticData] = useState({});

  const getStatisticData = async () => {
    const response = await dashboardAPI.getStatistic();
    setStatisticData(response.data.result);
  };

  useEffect(() => {
    getStatisticData();
  }, []);

  return (
    <div className="basis-1/2 relative grid grid-cols-2 grid-rows-2 py-1 px-1 mr-16 bg-white border border-neutral-300 rounded-md">
      <StatisticItem
        title="Total Employees"
        data={statisticData.totalEmployees}
        unit="Employees"
      />

      <StatisticItem
        title="Total Projects"
        data={statisticData.totalProjects}
        unit="Projects"
      />

      <StatisticItem
        title="Total Candidates"
        data={statisticData.totalCandidates}
        unit="Candidates"
      />

      <StatisticItem
        title="On going"
        data={statisticData.activeProjects}
        unit="Projects"
      />

      <div className="absolute top-1/2 w-full px-6">
        <div className="border-t border-neutral-150" />
      </div>

      <div className="absolute left-1/2 h-full py-5">
        <div className="border-r border-neutral-150 h-full" />
      </div>
    </div>
  );
};

export default ResourceStatistic;

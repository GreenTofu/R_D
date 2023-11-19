import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import dashboardAPI from "api/dashboardAPI";
import UpRightArrowIcon from "assets/icons/arrow-up-right.png";
import { getFullname } from "utils/helper";

import UpcomingResourceItem from "./upcomingResourceItem";

const UpcomingResources = () => {
  const [upcomingList, setUpcomingList] = useState([]);

  const getUpcomingResource = async () => {
    const result = await dashboardAPI.getUpcomingResources();
    setUpcomingList(result.data.resources.rows);
  };

  useEffect(() => {
    getUpcomingResource();
  }, []);

  return (
    <div className="basis-5/12 py-4 bg-white border border-neutral-300 rounded-md">
      <div className="flex justify-between px-5 mb-3">
        <p className="text-lg font-semibold">Upcoming Resources</p>
        <Link to="/resources/employees" className="flex items-center">
          <img
            className="w-3 h-3 mr-1"
            src={UpRightArrowIcon}
            alt="up-arrow"
          />
          <p className="text-xs text-primary">View all</p>
        </Link>
      </div>

      {upcomingList.map((employee) => (
        <UpcomingResourceItem
          key={employee.id}
          id={employee.id}
          avatar={employee.avatar}
          name={getFullname(employee)}
          position={employee.position}
        />
      ))}
    </div>
  );
};

export default UpcomingResources;

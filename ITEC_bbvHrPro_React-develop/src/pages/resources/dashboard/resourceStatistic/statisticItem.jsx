import React from "react";

import TrendDownIcon from "assets/icons/arrow-trend-down.png";
import TrendUpIcon from "assets/icons/arrow-trend-up.png";

const StatisticItem = ({ title, data = {}, unit }) => {
  const bgColor =
    data.percentage < 0 ? "bg-color-2-100" : "bg-success-100";
  const icon = data.percentage < 0 ? TrendDownIcon : TrendUpIcon;
  const textColor =
    data.percentage < 0 ? "text-color-2-500" : "text-success-600";

  const percent = Math.ceil(Math.abs(data.percentage)) || 0;

  return (
    <div className="flex items-center ml-5">
      <div>
        <p className="mb-6 text-sm font-bold text-neutral-700">
          {title}
        </p>

        <div className="flex items-center mb-1">
          <p className="mr-2 text-2xl font-semibold">
            {data.total || 10}
          </p>

          <div
            className={`flex items-center px-2 py-1 h-fit rounded ${bgColor}`}
          >
            <img className="mr-2 h-3 w-3" src={icon} alt="trend" />
            <p className={`text-xs font-medium ${textColor}`}>
              {percent}%
            </p>
          </div>
        </div>

        <p className="text-xs text-neutral-500">{unit}</p>
      </div>
    </div>
  );
};

export default StatisticItem;

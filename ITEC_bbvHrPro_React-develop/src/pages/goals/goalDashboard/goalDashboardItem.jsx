import moment from "moment";
import React from "react";

import arrowIcon from "assets/icons/arrow-right-black.png";
import { GOAL_STATUS_CSS } from "utils/constant";
import { getFullname } from "utils/helper";

const GoalDashboardItem = ({ goal, onClick }) => {
  const { user, title, status, updatedAt } = goal;

  return (
    <button
      type="button"
      className="w-full text-start flex items-center bg-white py-5 px-6 hover:bg-neutral-100 cursor-pointer border-b border-neutral-200"
      onClick={onClick}
    >
      <div className="basis-3/12 w-6 h-6 flex items-center">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-7 h-7 rounded-full border inline mr-2"
        />
        <p>{getFullname(user)}</p>
      </div>

      <div className="basis-5/12 text-bold flex items-center">
        <p>{title}</p>
      </div>

      <div className="basis-3/12 flex items-center">
        <p className={`${GOAL_STATUS_CSS[status.name]}`}>{status?.name}</p>
      </div>

      <div className="basis-1/4 flex items-center">
        <p className="text-neutral-500">
          {moment(updatedAt).calendar()}
        </p>
      </div>

      <div className="w-5 flex items-center">
        <img src={arrowIcon} alt="arrow-icon" />
      </div>
    </button>
  );
};

export default GoalDashboardItem;

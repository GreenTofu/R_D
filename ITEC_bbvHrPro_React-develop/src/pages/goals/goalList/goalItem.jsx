import moment from "moment";
import React from "react";

import arrowRightIc from "assets/icons/arrow-right.png";
import { GOAL_STATUS_CSS } from "utils/constant";

const GoalItem = ({ goal, onClick }) => {

  return (
    <button
      type="button"
      className="w-full text-start flex items-center bg-white py-4 px-6 hover:bg-neutral-100 cursor-pointer border-b border-neutral-200"
      key={goal.id}
      onClick={onClick}
    >
      <div className="basis-6/12 w-7 h-7 flex items-center ">
        <p className="text-neutral-900 text-sm">{goal.title}</p>
      </div>

      <div className="basis-3/12 text-bold flex items-center">
        <p className={GOAL_STATUS_CSS[goal.status.name]}>
          {goal.status.name}
        </p>
      </div>

      <div className="text-start basis-3/12">
        <p className="text-sm text-neutral-500">
          {moment(goal.createdAt).calendar()}
        </p>
      </div>

      <div className="text-start basis-2/12">
        <p className="text-sm text-neutral-500">
          {moment(goal.updatedAt).calendar()}
        </p>
      </div>
      <div className="basis-1/12 flex justify-end">
        <img src={arrowRightIc} alt="" className="w-6 " />
      </div>
    </button>
  );
};

export default GoalItem;

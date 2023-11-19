import React from "react";
import { Link } from "react-router-dom";

import arrowIcon from "assets/icons/arrow-right-black.png";
import FinalPoint from "components/finalPoint";
import { getFullname } from "utils/helper";

const commonStyle = "py-1.5 px-2 rounded-full text-xs";

const statusList = {
  Evaluating: `${commonStyle} bg-warning-100 text-warning-500`,
  "In Finalizing": `${commonStyle} bg-primary-100 text-primary-500`,
  Completed: `${commonStyle} bg-success-100 text-success-700`,
};

const ReviewItem = ({ item }) => {
  const { id, employee, evaluator, status, finalPoint } = item;

  return (
    <Link to={`reviews/${id}`}>
      <div className="flex items-center bg-white py-4 px-6 hover:bg-neutral-100 cursor-pointer border-b border-neutral-200">
        <div className="basis-3/12 w-6 h-6 flex items-center">
          <img
            src={employee.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full border inline mr-2"
          />
          <p>{getFullname(employee)}</p>
        </div>

        <div className="basis-3/12 text-bold flex items-center">
          <p className={statusList[status.name]}>{status.name}</p>
        </div>

        <div className="basis-3/12 flex items-center">
          <p>{getFullname(evaluator)}</p>
        </div>

        <div className="basis-3/12 flex items-center">
          <FinalPoint finalPoint={finalPoint} />
        </div>

        <div className="w-5 flex items-center">
          <img src={arrowIcon} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default ReviewItem;

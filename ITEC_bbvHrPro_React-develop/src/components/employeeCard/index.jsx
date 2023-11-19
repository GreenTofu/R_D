import React from "react";

import { getFullname } from "utils/helper";

const EmployeeCard = ({
  employee,
  imageClass,
  nameClass,
  positionClass,
}) => {
  return (
    <div className="flex items-center">
      <img
        className={`${imageClass} w-9 h-9 mr-3 rounded-full`}
        src={employee?.avatar}
        alt="avatar"
      />

      <div>
        <p className={`${nameClass} text-sm mb-0.5`}>
          {getFullname(employee)}
        </p>
        <p className={`${positionClass} text-neutral-500 text-xs`}>
          {employee?.position}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;

import React from "react";
import { Link } from "react-router-dom";

import arrowIcon from "assets/icons/arrow-right-black.png";
import Tag from "components/tag";
import { getFullname } from "utils/helper";

const commonStyle = "py-1.5 px-2 rounded-full text-xs";
const positionList = {
  "Project Manager": `${commonStyle} bg-danger-100 text-danger-500`,
  Designer: `${commonStyle} bg-fuchsia-50 text-fuchsia-500`,
  "Human Resources": `${commonStyle} bg-success-100 text-success-700`,
  "Service Unit Manager": `${commonStyle} bg-primary-100 text-primary-500`,
  "Software Engineer": `${commonStyle} bg-neutral-200 text-neutral-700`,
};

const EmployeeItem = ({ employee }) => {
  const extraTags = employee.tags.length - 2;

  return (
    <Link to={`/resources/employees/${employee.id}`}>
      <div className="flex items-center bg-white py-4 px-6 hover:bg-neutral-100 cursor-pointer border-b border-neutral-200">
        <div
          className="basis-3/12 w-6 h-6 flex items-center"
          key={employee.id}
        >
          <img
            src={employee.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full border inline mr-2"
          />
          <p>{getFullname(employee)}</p>
        </div>

        <div className="basis-3/12 text-bold flex items-center">
          <p className={positionList[employee.position]}>
            {employee.position}
          </p>
        </div>

        <div className="basis-3/12 flex items-center">
          {employee.tags.slice(0, 2).map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}

          <span className="text-neutral-600 text-xs">
            {extraTags > 0 ? `+${extraTags}` : null}
          </span>
        </div>

        <div className="basis-2/12 flex items-center">
          <p>
            {employee.directManager
              ? getFullname(employee.directManager)
              : "None"}
          </p>
        </div>

        <div className="basis-2/12 flex items-center">
          <div className="border rounded w-14 h-8 flex justify-center items-center">
            <p className="text-center text-xs text-neutral-500">
              {employee.availability}%
            </p>
          </div>
        </div>

        <div className="w-5 flex items-center">
          <img src={arrowIcon} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default EmployeeItem;

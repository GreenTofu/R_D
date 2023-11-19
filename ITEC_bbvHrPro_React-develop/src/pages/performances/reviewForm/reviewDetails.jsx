import React from "react";

import EmployeeCard from "components/employeeCard";
import { getReviewStatusStyle } from "utils/helper";

import ReviewPoint from "./reviewPoint";

const ReviewDetails = ({ currentUser, review }) => {
  const { employee, evaluator, status } = review;

  const isEmployee = currentUser?.id === employee?.id;
  const isManager = currentUser?.id === evaluator?.id;

  const statusStyle = getReviewStatusStyle(status?.name);

  return (
    <div className="flex items-center">
      <div>
        <p className="font-bold font-nunito mb-1.5">
          Employee {isEmployee && "(You)"}
        </p>
        <EmployeeCard employee={employee} />
      </div>

      <div className="ml-32">
        <p className="font-bold font-nunito mb-1.5">
          Evaluator {isManager && "(You)"}
        </p>

        <EmployeeCard employee={evaluator} />
      </div>

      <div className="ml-44">
        <p className="font-nunito font-bold">
          Current Status:
          <span className={`${statusStyle} font-normal ml-3`}>
            {status?.name}
          </span>
        </p>

        <div className="mt-4 flex items-center">
          <p className="font-nunito font-bold mr-3">Final Score:</p>
          <ReviewPoint point={review?.finalPoint} disabled />
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;

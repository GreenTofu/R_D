import React from "react";

import { getFullname } from "utils/helper";

const SelectedEmployee = ({ employee, onRemove }) => {
  return (
    <div className="flex justify-between mb-6">
      <div className="flex items-center">
        <img
          className="rounded-full w-8 h-8 mr-3"
          src={employee?.avatar}
          alt="avatar"
        />
        <div>
          <p className="text-sm text-neutral-900">
            {getFullname(employee)}
          </p>
          <p className="text-[11px] text-neutral-500">
            {employee.position}
          </p>
        </div>
      </div>

      <button type="button" onClick={onRemove}>
        <p className="text-xs text-danger-400">Remove</p>
      </button>
    </div>
  );
};

export default SelectedEmployee;

import React from "react";

const WorkingProject = ({
  id,
  logo,
  name,
  effort,
  register,
  isEditable,
}) => {
  return (
    <div className="flex mb-5 justify-between">
      <div className="flex items-center">
        <img className="w-7 h-7 mr-3" src={logo} alt="logo" />
        <p className="text-sm">{name}</p>
      </div>

      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            disabled={!isEditable}
            name={id}
            value={effort}
            {...(isEditable && {
              ...register(`currentProjects.${id}`),
            })}
            className="rounded-md w-12 border bg-white text-xs pl-2 py-1 mr-2.5"
          />
          <p className="absolute text-xs right-6">%</p>
        </div>

        <p className="text-xs text-gray-600">efforts</p>
      </div>
    </div>
  );
};

export default WorkingProject;

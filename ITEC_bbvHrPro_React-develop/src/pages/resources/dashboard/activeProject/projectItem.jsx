import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ data }) => {
  const extra = data.members.length - 3 || 0;

  return (
    <Link to={`/resources/projects/${data.id}`}>
      <div className="py-4 border-b border-neutral-200 hover:bg-neutral-100">
        <div className="flex px-6">
          <div className="basis-6/12 flex items-center mr-2">
            <p className="text-sm text-neutral-800">{data.name}</p>
          </div>

          <div className="basis-3/12 flex">
            <div className="flex justify-end ml-6">
              {extra > 3 && (
                <div className="flex justify-center items-center w-7 h-7 rounded-full bg-neutral-400">
                  <p className="text-[9px] text-white">+{extra}</p>
                </div>
              )}

              {data.members.map((item) => (
                <div key={item.id} className="w-7 h-7 -ml-12">
                  <img
                    className="rounded-full"
                    src={item.avatar}
                    alt="avatar"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="basis-3/12 flex justify-end items-center">
            <p className="text-xs text-neutral-500">{data.endDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectItem;

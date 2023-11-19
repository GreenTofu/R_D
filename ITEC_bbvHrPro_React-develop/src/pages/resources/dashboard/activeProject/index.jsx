import React from "react";
import { Link } from "react-router-dom";

import UpRightArrowIcon from "assets/icons/arrow-up-right.png";
import Pagination from "components/pagination";
import useProjects from "hooks/useProjects";

import ProjectItem from "./projectItem";

const ActiveProjects = () => {
  const {
    projectList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
  } = useProjects({
    filter: "projectStatus",
    search: "In Progress",
    limit: 3,
  });

  return (
    <div className="basis-3/4 py-4 xl:mr-16 sm:mr-8 bg-white border border-neutral-300 rounded-md">
      <div className="flex justify-between px-6 mb-6">
        <p className="text-lg font-semibold">Active Projects</p>

        <Link to="/resources/projects" className="flex items-center">
          <img
            className="w-3 h-3 mr-1"
            src={UpRightArrowIcon}
            alt="up-arrow"
          />
          <p className="text-xs text-primary">View all</p>
        </Link>
      </div>

      <div className="flex px-6 mb-2">
        <div className="basis-5/12 mr-2">
          <p className="text-xs font-bold text-neutral-700">Name</p>
        </div>

        <div className="basis-4/12 flex justify-center mr-2">
          <p className="text-xs font-bold text-neutral-700">
            Team members
          </p>
        </div>

        <div className="basis-3/12 flex justify-end">
          <p className="text-xs font-bold text-neutral-700">
            Due date
          </p>
        </div>
      </div>

      <div className="h-44 mb-1">
        {projectList.map((project) => (
          <ProjectItem key={project.id} data={project} />
        ))}
      </div>

      <div className="mt-7">
        <Pagination
          totalResults={total}
          totalPages={totalPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ActiveProjects;

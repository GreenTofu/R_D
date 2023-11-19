import React from "react";
import { Link } from "react-router-dom";

import Tag from "components/tag";
import TeamMember from "components/teamMember";
import { getFullname } from "utils/helper";

const commonStyle = "py-1 px-2 rounded-full text-xs";
const statusList = {
  Upcoming: `${commonStyle} bg-info-100 text-info-500`,
  "In progress": `${commonStyle} bg-warning-100 text-warning-500`,
  Complete: `${commonStyle} bg-success-100 text-success-700`,
};

const ProjectItem = ({ project }) => {
  const extraTags = project.tags.length - 2;

  return (
    <Link to={`/resources/projects/${project.id}`}>
      <div className="flex items-center bg-white py-4 px-6 hover:bg-neutral-100 cursor-pointer border-b border-neutral-200">
        <div className="basis-3/12 w-7 h-7 flex items-center ">
          <p className="text-neutral-900 text-sm">{project?.name}</p>
        </div>

        <div className="basis-2/12 text-bold flex items-center">
          <p
            className={statusList[project.projectStatus?.statusName]}
          >
            {project.projectStatus?.statusName}
          </p>
        </div>

        <div className="flex basis-3/12">
          {project.tags.slice(0, 2).map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}

          <span className="text-neutral-600 text-xs">
            {extraTags > 0 ? `+${extraTags}` : null}
          </span>
        </div>

        <div className="basis-2/12 flex items-center">
          {project.members.length > 0 ? (
            <TeamMember teamMembers={project?.members} />
          ) : (
            <p className="text-neutral-500 text-sm">Not assigned</p>
          )}
        </div>

        <div className="basis-3/12 w-7 h-7 flex items-center">
          {project?.projectManager ? (
            <>
              <img
                src={project.projectManager.avatar}
                alt=""
                className="w-7 h-7 rounded-full border inline mr-2"
              />
              <p className="text-neutral-900 text-sm">
                {getFullname(project.projectManager)}
              </p>
            </>
          ) : (
            <p className="text-neutral-500 text-sm">Not assigned</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectItem;

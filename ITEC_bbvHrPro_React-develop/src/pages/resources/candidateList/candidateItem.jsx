import React from "react";
import { Link } from "react-router-dom";

import Tag from "components/tag";
import { getFullname } from "utils/helper";

const CandidateItem = ({ candidate }) => {
  const { id, avatar, position, tags } = candidate;

  const sortedSkills = tags
    ? tags.sort((a, b) => b.name.length - a.name.length)
    : [];

  return (
    <Link to={`/resources/employees/${id}`}>
      <div className="h-full py-4 px-6 bg-white rounded-md drop-shadow hover:bg-neutral-100 cursor-pointer">
        <div className="mt-3">
          <div className="flex justify-center">
            <img
              className="w-16 h-16 rounded-full"
              src={avatar}
              alt="avatar"
            />
          </div>
          <p className="text-neutral-900 font-bold text-center mt-4">
            {getFullname(candidate)}
          </p>
          <p className="text-[13px] text-neutral-500 font-semibold text-center mt-1">
            {position}
          </p>
          <p className="text-xs text-neutral-900 mt-5">Skills</p>

          <div className="mt-2 max-h-16 flex flex-wrap overflow-hidden">
            {sortedSkills.map((tag) => (
              <Tag key={tag.id} className="mb-2 mr-2">
                {tag.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CandidateItem;

import React from "react";
import { Link } from "react-router-dom";

import Tag from "components/tag";
import { getFullname } from "utils/helper";

const AvailabilityItem = ({ data }) => {
  const { id, avatar, availability, tags } = data;

  const extraTags = tags.length - 2;

  return (
    <Link to={`/resources/employees/${id}`}>
      <div className="py-3.5 border-b border-neutral-200 hover:bg-neutral-100">
        <div className="flex px-6 items-center">
          <div className="basis-4/12 flex items-center mr-2">
            <img
              className="w-7 h-7 mr-2 rounded-full"
              src={avatar}
              alt="avatar"
            />
            <p className="text-xs">{getFullname(data)}</p>
          </div>

          <div className="basis-5/12 flex items-center mr-2">
            {tags.slice(0, 2).map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}

            <span className="text-neutral-600 text-xs">
              {extraTags > 0 ? `+${extraTags}` : null}
            </span>
          </div>

          <div className="basis-3/12 flex justify-center">
            <div className="flex justify-center items-center border rounded w-12 h-8">
              <p className="w-7 text-center text-[11px] text-neutral">
                {availability}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AvailabilityItem;

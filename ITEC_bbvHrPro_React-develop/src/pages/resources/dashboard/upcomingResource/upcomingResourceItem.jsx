import React from "react";
import { Link } from "react-router-dom";

const UpcomingResourceItem = ({ id, avatar, name, position }) => {
  return (
    <Link to={`/resources/employees/${id}`}>
      <div className="flex justify-between items-center px-5 py-2 hover:bg-neutral-100">
        <div className="flex items-center">
          <img
            className="w-7 h-7 mr-2 rounded-full"
            src={avatar}
            alt="avatar"
          />
          <p className="text-xs">{name}</p>
        </div>

        <p className="text-xs text-neutral">{position}</p>
      </div>
    </Link>
  );
};

export default UpcomingResourceItem;

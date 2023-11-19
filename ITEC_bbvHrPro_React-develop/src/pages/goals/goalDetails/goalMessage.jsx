import moment from "moment";
import React from "react";

import { getFullname } from "utils/helper";

const GoalMessage = ({ messageData }) => {
  const { message, createdAt, user } = messageData;

  return (
    <div className="flex py-2">
      <img
        className="w-7 h-7 rounded-full mr-3"
        src={user?.avatar}
        alt="avatar"
      />
      <div className="bg-neutral-150 border rounded-md px-2.5 py-2 w-full">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[10px] font-bold">{getFullname(user)}</p>
          <p className="text-neutral-500 text-[7px] align-middle">
            {moment(createdAt).format("lll")}
          </p>
        </div>
        <p className="text-[10px]">{message}</p>
      </div>
    </div>
  );
};

export default GoalMessage;

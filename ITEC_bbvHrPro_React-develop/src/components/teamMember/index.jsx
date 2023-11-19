import React from "react";

const TeamMember = ({ teamMembers }) => {
  const totalMember = teamMembers.length;
  const extra = totalMember - 3;

  return (
    <div className="flex justify-end ml-6">
      {totalMember > 3 && (
        <div className="flex justify-center items-center w-6 h-6 rounded-full bg-gray-400">
          <p className="text-[9px] text-white">+{extra}</p>
        </div>
      )}
      {teamMembers.map((item) => (
        <div key={item.id} className="w-6 h-6 -ml-10">
          <img
            className="rounded-full"
            src={item.avatar}
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default TeamMember;

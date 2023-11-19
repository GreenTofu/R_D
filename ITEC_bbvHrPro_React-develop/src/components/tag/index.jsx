import React from "react";

const Tag = ({ children, className = "" }) => {
  return (
    <div
      className={`${className} text-[11px] border border-neutral-500 text-neutral-900 px-1.5 py-1 rounded mr-1 bg-white`}
    >
      {children}
    </div>
  );
};

export default Tag;

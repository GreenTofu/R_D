import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBarItem = ({ name, link, icon }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(link);

  const activeRoute = () => {
    return isActive
      ? "[&>div]:bg-neutral-150 [&>div>p]:font-semibold"
      : "";
  };

  return (
    <NavLink end to={link} className={activeRoute}>
      <div className="flex items-center h-10 min-w-60 px-4 mb-1 rounded-md hover:bg-slate-50 duration-200">
        <img className="h-4 w-4 mr-3" src={icon} alt="logo" />
        <p className="text-sm text-neutral-600">{name}</p>
      </div>
    </NavLink>
  );
};

export default SideBarItem;

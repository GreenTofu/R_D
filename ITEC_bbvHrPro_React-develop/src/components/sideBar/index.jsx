import React, { useState } from "react";
import { Link } from "react-router-dom";

import AppLogo from "assets/app-logo.png";
import CandidateIcon from "assets/icons/candidate.png";
import DashboardIcon from "assets/icons/dashboard.png";
import EmployeeIcon from "assets/icons/employee.png";
import GoalIcon from "assets/icons/goal.png";
import PerformanceIcon from "assets/icons/performance.png";
import ProjectIcon from "assets/icons/project.png";
import SignOutIcon from "assets/icons/sign-out.png";
import SideBarItem from "components/sideBar/sideBarItem";
import SignOutModal from "components/signOutModal";
import useUserStore from "store/userStore";
import { ROLE } from "utils/constant";
import { getFullname } from "utils/helper";

const SideBar = () => {
  const user = useUserStore((state) => state.user);

  const [openSignOutModal, setOpenSignOutModal] = useState(false);

  const onClickSignOut = (e) => {
    e.preventDefault();
    setOpenSignOutModal(!openSignOutModal);
  };

  return (
    <>
      <div className="relative">
        <div className="w-60">
          <div className="fixed drop-shadow-md w-60 bg-white">
            <div className="relative h-screen">
              <div className="flex justify-center mt-2 mb-2">
                <img
                  className="scale-50 cursor-pointer"
                  src={AppLogo}
                  alt="logo"
                />
              </div>

              <div className="mt-3 px-4">
                <SideBarItem
                  name="Performance Reviews"
                  link="/performances"
                  icon={PerformanceIcon}
                />

                <SideBarItem
                  name="Goal Management"
                  link="/goals"
                  icon={GoalIcon}
                />

                {user?.role === ROLE.MANAGER && (
                  <div>
                    <div className="mt-8 mb-3 pl-3 cursor-default">
                      <p className="text-xs text-neutral font-semibold">
                        Resource Management
                      </p>
                    </div>

                    <SideBarItem
                      name="Dashboard"
                      link="/resources/dashboard"
                      icon={DashboardIcon}
                    />

                    <SideBarItem
                      name="Employees"
                      link="/resources/employees"
                      icon={EmployeeIcon}
                    />

                    <SideBarItem
                      name="Candidates"
                      link="/resources/candidates"
                      icon={CandidateIcon}
                    />

                    <SideBarItem
                      name="Projects"
                      link="/resources/projects"
                      icon={ProjectIcon}
                    />
                  </div>
                )}
              </div>

              <Link to={`/resources/employees/${user?.id}`}>
                <div className="absolute bottom-3 w-full cursor-pointer">
                  <hr />
                  <div className="relative flex items-center px-4 py-5">
                    <img
                      className="h-8 w-8 mr-3"
                      src={user?.avatar}
                      alt="user-avatar"
                    />
                    <div>
                      <p className="text-xs text-neutral-600 font-semibold">
                        {getFullname(user)}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {user?.email}
                      </p>
                    </div>

                    <button
                      className="absolute right-2 p-2 rounded-full hover:bg-slate-100 duration-200"
                      type="button"
                      onClick={onClickSignOut}
                    >
                      <img
                        className="w-5"
                        src={SignOutIcon}
                        alt="profile-icon"
                      />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SignOutModal
        open={openSignOutModal}
        onClose={() => setOpenSignOutModal(false)}
      />
    </>
  );
};

export default SideBar;

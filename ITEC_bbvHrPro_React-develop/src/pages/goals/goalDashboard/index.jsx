import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import goalAPI from "api/goalAPI";
import GoalModal from "components/goalModal";
import ResourceHeader from "components/resourceHeader";
import ResourcePagination from "components/resourcePagination/resourcePagination";
import useGoalDashboard from "hooks/useGoalDashboard";
import { GOAL_FILTER_LIST } from "utils/constant";

import GoalDashboardItem from "./goalDashboardItem";

const GoalDashboard = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("employee");
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const {
    goalList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    updateGoal,
  } = useGoalDashboard({ search, filter });

  const onChangeSearch = (searchValue) => {
    setCurrentPage(1);
    setSearch(searchValue);
  };

  const handleSubmitText = () => {
    const statusName = openDetailModal.status?.name;

    if (statusName === "Pending Approval") return "Approve";
    return "Close";
  };

  const handleApprove = async () => {
    const response = await goalAPI.approveGoal(openDetailModal.id);
    const newGoal = response.data.goal;

    updateGoal(openDetailModal.id, newGoal);
    setOpenDetailModal(false);
  };

  const handleSubmit = () => {
    const statusName = openDetailModal.status?.name;

    if (statusName === "Approved") {
      setOpenDetailModal(false);
    } else handleApprove();
  };

  return (
    <>
      <ResourceHeader
        title="Goal Dashboard"
        filter={filter}
        setFilter={setFilter}
        onChangeSearch={onChangeSearch}
        filterList={GOAL_FILTER_LIST}
      />

      <div className="bg-white mt-8 pt-5 rounded-md drop-shadow-sm w-full text-sm text-neutral-500">
        <div className="flex mt-2 mb-4 px-6 text-neutral-900">
          <div className="basis-3/12 font-medium text-sm">
            Employee
          </div>

          <div className="basis-5/12 font-medium text-sm">
            Goal Title
          </div>

          <div className="basis-3/12 font-medium text-sm">Status</div>

          <div className="basis-1/4 font-medium text-sm">
            Last Update
          </div>

          <div className="w-5" />
        </div>

        <div>
          {goalList.length > 0 ? (
            goalList.map((goal) => (
              <GoalDashboardItem
                key={goal.id}
                goal={goal}
                onClick={() => navigate(`/goals/${goal.id}`)}
              />
            ))
          ) : (
            <div className="h-[200px] flex items-center justify-center">
              No goals found
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between rounded-md drop-shadow-sm bg-white mt-8 h-[50px] px-6 items-center">
        <p>
          <span>{total}</span> results
        </p>

        <div>
          <ResourcePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <GoalModal
        isOpen={openDetailModal}
        goalData={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        onSubmit={handleSubmit}
        modalTitle="Goal Details"
        submitButtonText={handleSubmitText()}
        isManager
      />
    </>
  );
};

export default GoalDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import goalAPI from "api/goalAPI";
import addIcon from "assets/icons/ic_add.png";
import GoalModal from "components/goalModal";
import useEmployeeGoals from "hooks/useEmployeeGoals";

import GoalItem from "./goalItem";

const GoalList = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { goalList, addGoal } = useEmployeeGoals();

  const closeModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreate = async (data) => {
    const response = await goalAPI.createGoal(data);
    const newGoal = response.data.goal;

    addGoal(newGoal);
    closeModal();
  };

  return (
    <>
      <div className="h-9 flex justify-between mb-14">
        <h1 className="font-bold text-2xl text-neutral-900">
          My Goal List
        </h1>
        <button
          type="button"
          className="h-full flex items-center border border-primary capitalize px-3 text-sm rounded bg-white"
          onClick={() => setOpenCreateModal(true)}
        >
          <span className="text-primary">Create</span>
          <img src={addIcon} alt="" className="w-4 h-4 ml-1.5" />
        </button>
      </div>

      <div className="bg-white mt-8 rounded-md drop-shadow-sm">
        <div className="relative pt-5">
          <div className="w-full text-sm text-left">
            <div className="flex mb-4 py-2 px-5 bg-opacity-30 text-neutral-700">
              <div className="basis-6/12 font-bold text-sm text-neutral-900">
                <h1>Goal Title</h1>
              </div>
              <div className="basis-3/12 font-bold text-sm text-neutral-900">
                <h1>Status</h1>
              </div>

              <div className="basis-3/12 font-bold text-sm text-neutral-900">
                <h1>Date Created</h1>
              </div>

              <div className="basis-2/12 font-bold text-sm text-neutral-900">
                <h1>Last Update</h1>
              </div>

              <div className="basis-1/12" />
            </div>

            <div className="w-full">
              {goalList.length > 0 ? (
                goalList.map((goal) => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    onClick={() => navigate(`/goals/${goal.id}`)}
                  />
                ))
              ) : (
                <div className="h-[200px] flex items-center justify-center">
                  No goal data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <GoalModal
        isOpen={openCreateModal}
        onClose={closeModal}
        onSubmit={handleCreate}
        modalTitle="Create Goal"
        submitButtonText="Submit"
        isCreateGoal
      />
    </>
  );
};

export default GoalList;

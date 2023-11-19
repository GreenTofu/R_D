import moment from "moment";
import React, { useCallback, useState } from "react";

import goalAPI from "api/goalAPI";
import editIcon from "assets/icons/ic-edit.png";
import deleteIcon from "assets/icons/ic-trash.png";
import ConfirmModal from "components/confirmModal";
import useGoalStore from "store/goalStore";
import { GOAL } from "utils/constant";
import { getFullname } from "utils/helper";

import ActionButton from "./actionButton";

const GoalContentCard = ({
  goal,
  updateGoal,
  isSUM,
  onClickEdit,
  onClickDelete,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmAction, setOpenConfirmAction] = useState(false);

  const { getStatus } = useGoalStore();

  const getConfirmActionTitle = useCallback(
    () => (isSUM ? "Approve" : "Request"),
    [isSUM]
  );

  const getConfirmActionDescription = useCallback(() => {
    let description = "Are you sure you want to ";

    description += isSUM
      ? "approve this goal?"
      : "request approval for this goal?";

    return description;
  }, [isSUM]);

  const handleButtonAction = async () => {
    setIsLoading(true);

    const updatedStatus = isSUM ? GOAL.APPROVED : GOAL.PENDING;
    const requestStatus = getStatus({ name: updatedStatus });

    const goalData = { statusId: requestStatus.id };

    const { data } = await goalAPI.updateGoal(goal.id, goalData);

    setOpenConfirmAction(false);

    setTimeout(() => {
      updateGoal(data.goal);
      setIsLoading(false);
    }, 400);
  };

  const getGoalCycle = () => {
    if (!goal.startDate && !goal.endDate) return "Not defined yet";

    const startDate = goal?.startDate
      ? moment(goal?.startDate).format("ll")
      : "No data";

    const endDate = goal?.endDate
      ? moment(goal?.endDate).format("ll")
      : "No data";

    const goalCycle = `${startDate} - ${endDate}`;

    return goalCycle;
  };

  return (
    <>
      <div className="flex items-center">
        <img
          className="w-11 h-11 rounded-full"
          src={goal.user.avatar}
          alt="avatar"
        />

        <div className="ml-3.5">
          <p className="font-semibold text-xl">
            {getFullname(goal.user)}'s Goal
          </p>
          <p className="text-neutral-500 text-sm">
            {goal.user.position}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-bold mb-1">Goal Cycle</h3>
        <p className="text-sm">{getGoalCycle()}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-bold mb-1">Title</h3>
        <p className="text-sm">{goal.title}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-bold mb-1">Description</h3>
        <p className="text-sm">
          {goal?.description || "No description yet"}
        </p>
      </div>

      <ActionButton
        onClick={() => setOpenConfirmAction(true)}
        status={goal.status.name}
        isLoading={isLoading}
        isSUM={isSUM}
      />

      {!isSUM && (
        <div className="absolute top-7 right-7 flex items-center">
          <button
            disabled={goal.status.name === GOAL.EVALUATED}
            className="disabled:opacity-50"
            type="button"
            onClick={onClickEdit}
          >
            <img className="w-4 h-4" src={editIcon} alt="edit" />
          </button>

          <button
            disabled={goal.status.name !== GOAL.DRAFT}
            className="ml-4 disabled:opacity-50 tooltip"
            data-tip="Able in drafting mode only"
            type="button"
            onClick={() => setOpenConfirmDelete(true)}
          >
            <img className="w-4 h-4" src={deleteIcon} alt="delete" />
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={openConfirmAction}
        title={getConfirmActionTitle()}
        description={getConfirmActionDescription()}
        onConfirm={handleButtonAction}
        onCancel={() => setOpenConfirmAction(false)}
      />

      <ConfirmModal
        isOpen={openConfirmDelete}
        title="Delete"
        description="Are you sure you want to delete this goal?"
        confirmButtonStyle="bg-red-500 hover:bg-red-600"
        onConfirm={onClickDelete}
        onCancel={() => setOpenConfirmDelete(false)}
      />
    </>
  );
};

export default GoalContentCard;

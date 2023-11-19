import { isEmpty } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import goalAPI from "api/goalAPI";
import backIcon from "assets/icons/arrow-left-tail.png";
import FinalPoint from "components/finalPoint";
import GoalModal from "components/goalModal";
import useGoalDetails from "hooks/useGoalDetails";
import useGoalStore from "store/goalStore";
import useToastStore from "store/toastStore";
import { GOAL, GOAL_STATUS_CSS } from "utils/constant";
import { getFullname } from "utils/helper";

import GoalContentCard from "./goalContentCard";
import GoalDiscussion from "./goalDiscussion";

const GoalDetails = ({ isSUM }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { goal, updateGoal } = useGoalDetails({ goalId: id });

  const getStatus = useGoalStore((state) => state.getStatus);

  const [isEdit, setIsEdit] = useState(false);

  const { openSuccessfulToast, openErrorToast } = useToastStore();

  const handleUpdate = async (goalData) => {
    const approveStatus = getStatus({ name: GOAL.APPROVED }).id;
    const pendingStatus = getStatus({ name: GOAL.PENDING }).id;

    if (goalData.statusId === approveStatus) {
      goalData.statusId = pendingStatus;
    }

    try {
      const { data } = await goalAPI.updateGoal(id, goalData);

      setIsEdit(false);
      updateGoal(data.goal);

      openSuccessfulToast("Update goal detail successfully");
    } catch (error) {
      const { message } = error.response.data;
      openErrorToast(message);
    }
  };

  const handleDelete = async () => {
    try {
      await goalAPI.deleteGoal(id);

      openSuccessfulToast("Delete goal successfully");
      navigate("/goals");
    } catch (error) {
      const { message } = error.response.data;
      openErrorToast(message);
    }
  };

  if (isEmpty(goal)) return null;

  return (
    <div>
      <Link to="/goals" className="flex items-center">
        <img className="w-5 h-5" src={backIcon} alt="Back" />
        <h3 className="ml-4 text-2xl font-bold">Back to dashboard</h3>
      </Link>

      <div className="flex mt-10 h-max">
        <div className="w-[575px] p-7 bg-white shadow-sm rounded-md relative">
          <GoalContentCard
            goal={goal}
            updateGoal={updateGoal}
            isSUM={isSUM}
            onClickEdit={() => setIsEdit(true)}
            onClickDelete={handleDelete}
          />
        </div>

        <div className="ml-16 w-[354px]">
          <div className="bg-white p-5 shadow-sm rounded">
            <div className="flex items-center">
              <h4 className="text-sm font-bold">Manager: </h4>

              <img
                className="w-7 h-7 ml-4 rounded-full"
                src={goal.user.directManager?.avatar}
                alt="avatar"
              />

              <p className="text-sm ml-2">
                {getFullname(goal.user.directManager)}
              </p>
            </div>

            <div className="mt-5 flex items-center">
              <h4 className="text-sm font-bold">Status: </h4>

              <div className="ml-3">
                <p className={`${GOAL_STATUS_CSS[goal.status.name]}`}>
                  {goal.status.name}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center">
              <h4 className="text-sm font-bold mr-2">Final Point:</h4>

              <FinalPoint finalPoint={goal.finalPoint} />
            </div>

            <div className="mt-5 flex items-center">
              <h4 className="text-sm font-bold">Last Update: </h4>

              <p className="text-sm ml-2">
                {moment(goal.updatedAt).calendar()}
              </p>
            </div>
          </div>

          <div className="mt-5 bg-white shadow-sm rounded-md h-[300px]">
            <GoalDiscussion goalID={id} />
          </div>
        </div>
      </div>

      <GoalModal
        isOpen={isEdit}
        goalData={goal}
        onClose={() => setIsEdit(false)}
        onSubmit={handleUpdate}
        modalTitle="Goal Details"
        submitButtonText="Save"
      />
    </div>
  );
};

export default GoalDetails;

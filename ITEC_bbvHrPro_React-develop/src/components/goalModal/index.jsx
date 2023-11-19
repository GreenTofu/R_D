import { clone, pick } from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import SwitchGrayIcon from "assets/icons/ic-clockwise-gray.png";
import SwitchOrangeIcon from "assets/icons/ic-clockwise-orange.png";
import InputField from "components/inputField";
import Modal from "components/modal";
import useGoalStore from "store/goalStore";
import useUserStore from "store/userStore";
import { GOAL, GOAL_STATUS_CSS } from "utils/constant";
import { getFullname } from "utils/helper";
import { goalTitleValidator } from "utils/validator";

const GoalModal = ({
  isOpen,
  goalData = null,
  onClose,
  onSubmit,
  modalTitle,
  submitButtonText,
  isCreateGoal,
  isManager,
}) => {
  const currentUser = useUserStore((state) => state.user);
  const getStatus = useGoalStore((state) => state.getStatus);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  const employeeData = isManager ? goalData.user : currentUser;

  const managerData = isCreateGoal
    ? currentUser.directManager
    : goalData.user?.directManager;

  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  const statusName =
    getStatus({ id: watch("statusId") })?.name || GOAL.PENDING;

  const switchToDraft = () => {
    const draftStatus = getStatus({ name: GOAL.DRAFT });

    setValue("statusId", draftStatus.id);
  };

  const switchToPending = () => {
    const pendingStatus = getStatus({ name: GOAL.PENDING });

    setValue("statusId", pendingStatus.id);
  };

  useEffect(() => {
    const defaultGoal = clone(goalData) || {};

    if (!defaultGoal?.statusId) {
      defaultGoal.statusId = getStatus({ name: GOAL.PENDING })?.id;
    }

    reset(
      pick(defaultGoal, [
        "title",
        "description",
        "startDate",
        "endDate",
        "statusId",
      ])
    );
  }, [isOpen, goalData]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="py-7 px-10 bg-white min-w-[573px] relative">
        <div className="flex justify-between mb-8">
          <h1 className="text-xl text-neutral-900 font-bold">
            {modalTitle}
          </h1>
        </div>

        {statusName === GOAL.PENDING && (
          <button
            type="button"
            className="absolute top-7 right-10 flex items-center"
            onClick={switchToDraft}
          >
            <img
              className="w-3 h-3 mr-1"
              src={SwitchGrayIcon}
              alt="switch"
            />
            <span className="ml-1 text-xs text-neutral-500">
              Switch to draft version
            </span>
          </button>
        )}

        {statusName === GOAL.DRAFT && (
          <button
            type="button"
            className="absolute top-7 right-10 flex items-center"
            onClick={switchToPending}
          >
            <img
              className="w-3 h-3 mr-1"
              src={SwitchOrangeIcon}
              alt="switch"
            />
            <span className="ml-1 text-xs text-warning-500">
              Switch to normal version
            </span>
          </button>
        )}

        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <h1 className="text-sm text-neutral-900 font-bold w-20">
              Employee:
            </h1>
            <div className="flex items-center">
              <img
                src={employeeData?.avatar}
                alt="avatar"
                className="w-7 h-7 rounded-full border inline mr-2"
              />
              <p className="text-xs text-neutral-900">
                {getFullname(employeeData)}
                {currentUser.id === employeeData?.id && ` (You)`}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <h1 className="text-sm mr-2 text-neutral-900 font-bold">
              Status:
            </h1>
            <p className={`${GOAL_STATUS_CSS[statusName]}`}>
              {statusName}
            </p>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <h1 className="text-sm text-neutral-900 font-bold w-20">
            Manager:
          </h1>

          {managerData?.avatar ? (
            <div className="flex items-center">
              <img
                src={managerData.avatar}
                alt="avatar"
                className="w-7 h-7 rounded-full border inline mr-2"
              />
              <p className="text-xs text-neutral-900">
                {getFullname(managerData)}
                {currentUser.id === managerData?.id && ` (You)`}
              </p>
            </div>
          ) : (
            <p className="text-xs text-neutral-900">None</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data, isDirty))}
        >
          <InputField
            label="Title"
            type="text"
            name="title"
            placeholder="Goal Title"
            register={register}
            isEditable={!isManager}
            initialValue={goalData?.title}
            validator={goalTitleValidator}
            error={errors.title?.message}
          />

          <div className="mt-6 flex justify-between">
            <div className="w-52">
              <InputField
                label="Start date"
                type="date"
                name="startDate"
                register={register}
                initialValue={goalData?.startDate || currentDate}
                isEditable
              />
            </div>

            <div className="w-52">
              <InputField
                label="End date"
                type="date"
                name="endDate"
                register={register}
                initialValue={goalData?.endDate || null}
                isEditable
              />
            </div>
          </div>

          <p className="text-neutral-900 text-sm font-semibold mt-6 mb-1.5">
            Description
          </p>

          <textarea
            className="w-full h-40 rounded-md border text-sm resize-none px-3 py-4 disabled:bg-white"
            placeholder={
              isManager
                ? "Nothing here..."
                : "Write down the details about your goal..."
            }
            disabled={isManager}
            {...register("description")}
          />

          <div className="flex justify-center mt-8">
            <button
              className="w-24 flex justify-center px-8 py-3 mr-5 rounded-md bg-primary-100 hover:bg-primary-150 duration-200"
              type="submit"
            >
              <p className="text-xs text-primary-500">
                {submitButtonText}
              </p>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GoalModal;

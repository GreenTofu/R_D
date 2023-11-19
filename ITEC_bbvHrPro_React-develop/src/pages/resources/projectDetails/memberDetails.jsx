import React from "react";

import userMinusIc from "assets/icons/ic_user_minus.png";
import InputField from "components/inputField";
import Modal from "components/modal";
import { getFullname } from "utils/helper";
import { workingEffortValidator } from "utils/validator";

const AddMemberModal = ({
  register,
  errors,
  member,
  onRemove,
  onCancel,
  onConfirm,
}) => {
  const memberRegister = `members.${member?.index}.working`;

  return (
    <Modal open={member} onClose={onCancel}>
      <div className="relative py-6 px-10 bg-white">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img
              src={member?.avatar}
              alt=""
              className="rounded-full w-16 h-16"
            />
            <div className="ml-[18px]">
              <p className="text-xl text-neutral-900 font-semibold">
                {getFullname(member)}
              </p>
              <p className="text-xs text-neutral-500">
                {member?.position}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="ml-10 flex justify-center items-center border border-danger-500 rounded py-1.5 px-5"
          >
            <img src={userMinusIc} alt="" className="w-4 h-4 mr-1" />
            <span className="text-danger-500 text-xs">Remove</span>
          </button>
        </div>

        <div className="flex mt-9">
          <div className="w-40 mt-2">
            <p className="text-sm text-neutral-500">Start Date</p>

            <InputField
              type="date"
              name={`${memberRegister}.startDate`}
              register={register}
              initialValue={member?.startDate}
              className="mt-2 rounded border-neutral-500"
              isEditable
            />
          </div>

          <div className="w-40 mt-2 ml-16">
            <p className="text-sm text-neutral-500">End Date</p>

            <InputField
              type="date"
              name={`${memberRegister}.endDate`}
              register={register}
              initialValue={member?.endDate}
              className="mt-2 rounded border-neutral-500"
              isEditable
            />
          </div>
        </div>

        <div className="mt-11">
          <div className="flex items-center mt-4">
            <p className="text-sm text-neutral-900 w-40">
              Effort For Project
            </p>

            <div className="ml-16">
              <InputField
                name={`${memberRegister}.effort`}
                register={register}
                validator={workingEffortValidator}
                className="text-xs rounded w-14 h-8 py-1.5 text-center border-neutral-500"
                error={
                  errors?.members?.[member.index]?.working.effort
                    ?.message
                }
                isEditable
              />
            </div>

            <span className="ml-4 text-sm text-neutral-500">%</span>
          </div>

          <div className="flex items-center mt-4">
            <p className="text-sm text-neutral-900 w-40">
              Estimated Hours/Points
            </p>

            <InputField
              name={`${memberRegister}.estimateTime`}
              register={register}
              initialValue={member?.estimateTime}
              className="ml-16 text-xs rounded w-14 h-8 py-1.5 text-center border-neutral-500"
              isEditable
            />

            <span className="ml-4 text-sm text-neutral-500">
              hours
            </span>
          </div>
          <div className="flex items-center mt-4">
            <p className="text-sm text-neutral-900 w-40">
              Actual Hours/Points
            </p>

            <InputField
              name={`${memberRegister}.actualTime`}
              register={register}
              initialValue={member?.actualTime}
              className="ml-16 text-xs rounded w-14 h-8 py-1.5 text-center border-neutral-500"
              isEditable
            />

            <span className="ml-4 text-sm text-neutral-500">
              hours
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-24">
          <button
            type="button"
            className="border text-sm border-neutral-900 text-neutral-900 bg-white w-24 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white text-sm bg-neutral-900 w-24 py-2 rounded-md ml-3"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMemberModal;

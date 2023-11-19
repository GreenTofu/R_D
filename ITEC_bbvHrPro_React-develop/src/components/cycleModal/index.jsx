import { pick } from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import InputField from "components/inputField";
import Modal from "components/modal";
import { getFullname } from "utils/helper";

const CycleModal = ({
  isOpen,
  onClose,
  title,
  cycleDetail = null,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const onModalSubmit = (submitData) => {
    onSubmit({ ...submitData, id: cycleDetail?.id });
    onClose();
  };

  useEffect(() => {
    const cycleDates = pick(cycleDetail, [
      "startDate",
      "endDate",
      "empDueDate",
      "evalDueDate",
    ]);

    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(cycleDates)) {
      cycleDates[key] = moment(cycleDates[key]).format("YYYY-MM-DD");
    }

    reset(cycleDates);
  }, [cycleDetail]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form
        className="relative py-8 px-10 bg-white"
        onSubmit={handleSubmit(onModalSubmit)}
      >
        <h1 className="text-xl font-bold mb-5">{title}</h1>

        {cycleDetail?.creator && (
          <div className="flex items-center">
            <h1 className="text-neutral-900 text-sm font-bold mr-2">
              Created By
            </h1>
            <img
              src={cycleDetail.creator.avatar}
              alt="avatar"
              className="w-7 h-7 rounded-full border inline mr-2"
            />
            <p className="text-sm text-neutral-900">
              {getFullname(cycleDetail.creator)}
            </p>
          </div>
        )}

        <div className="flex mt-10">
          <InputField
            label="Start Date"
            type="date"
            name="startDate"
            register={register}
            validator={{ required: true }}
            isEditable
          />

          <div className="mx-6" />

          <InputField
            label="End Date"
            type="date"
            name="endDate"
            register={register}
            validator={{ required: true }}
            isEditable
          />
        </div>

        <div className="flex mt-10">
          <InputField
            label="Due Date (Employee)"
            type="date"
            name="empDueDate"
            register={register}
            validator={{ required: true }}
            isEditable
          />

          <div className="mx-6" />

          <InputField
            label="Due Date (Evaluator)"
            type="date"
            name="evalDueDate"
            register={register}
            validator={{ required: true }}
            isEditable
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="w-24 flex justify-center px-8 py-3 mr-5 rounded-md bg-primary-100 hover:bg-primary-150 duration-200"
            type="submit"
          >
            <p className="text-xs text-primary-500">Save</p>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CycleModal;

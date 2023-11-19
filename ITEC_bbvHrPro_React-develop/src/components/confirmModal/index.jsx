import React from "react";

import Modal from "components/modal";

const ConfirmModal = ({
  isOpen = false,
  title = "Title",
  description = "Are you sure you want to submit this action ?",
  confirmButtonStyle = "bg-primary-500  hover:bg-primary-550",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <div className="bg-white px-8 py-7 shadow-lg flex flex-col items-center w-[330px]">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-sm mt-3 text-center">{description}</p>

        <div className="mt-7 flex justify-between w-full">
          <button
            className="w-full text-sm bg-neutral-200 py-2.5 rounded duration-200 hover:bg-neutral-300"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>

          <button
            className={`w-full ml-4 text-sm  py-2.5 rounded duration-200 text-white ${confirmButtonStyle}`}
            onClick={onConfirm}
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

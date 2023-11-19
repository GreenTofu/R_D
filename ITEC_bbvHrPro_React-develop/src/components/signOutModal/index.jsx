import React from "react";
import { useNavigate } from "react-router-dom";

import redConfirmIcon from "assets/icons/red-confirm.png";
import Modal from "components/modal";
import useUserStore from "store/userStore";

const SignOutModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { signOutAction } = useUserStore();

  const onSignOut = () => {
    signOutAction();
    navigate("/authentication");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white px-7 py-7">
        <div className="flex justify-center">
          <img
            className="w-11 mb-5"
            src={redConfirmIcon}
            alt="confirm-icon"
          />
        </div>

        <p className="text-neutral-900 text-2xl font-semibold text-center mb-3">
          Sign out
        </p>
        <div className="flex justify-center">
          <p className="text-neutral-900 text-sm text-center w-44">
            Are you sure you want to sign out of this account?
          </p>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            className="py-2 px-10 bg-neutral-200 rounded mr-5 hover:bg-neutral-300 duration-200"
            type="button"
            onClick={onClose}
          >
            <p className="text-neutral-600 text-sm">Cancel</p>
          </button>
          <button
            className="py-2 px-10 bg-danger-500 rounded hover:bg-danger-600 duration-200"
            type="button"
            onClick={onSignOut}
          >
            <p className="text-white text-sm">Confirm</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignOutModal;

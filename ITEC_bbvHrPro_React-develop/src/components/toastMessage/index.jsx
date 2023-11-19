import React, { useEffect } from "react";

import CloseIcon from "assets/icons/close.png";
import GreenTickIcon from "assets/icons/ic-green-tick-circle.png";
import ErrorCircleIcon from "assets/icons/ic-red-info-circle.png";
import useToastStore from "store/toastStore";

const ToastMessage = () => {
  const { isOpen, state, message, closeToast } = useToastStore();

  const isSuccess = state === "success";

  useEffect(() => {
    let closeTimeout;
    if (isOpen) {
      closeTimeout = setTimeout(() => {
        closeToast();
      }, 5000);
    }

    return () => {
      clearTimeout(closeTimeout);
    };
  }, [isOpen]);

  return (
    <div
      className={`h-[84px] z-50 min-w-[370px] shadow-md fixed top-[10%] right-0 bg-white rounded duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      <div className="flex h-full relative">
        <div
          className={`${
            isSuccess ? "bg-success-200" : "bg-color-2-500"
          } w-[68px] h-full flex items-center justify-center rounded-l`}
        >
          <img
            className="w-8 h-8"
            src={isSuccess ? GreenTickIcon : ErrorCircleIcon}
            alt="tick|error"
          />
        </div>

        <div className="pl-3 pr-5 h-full flex flex-col justify-center">
          <p className="font-nunito font-bold">
            {isSuccess ? "Success" : "Error"}
          </p>

          <p className="text-neutral-500 text-sm mt-0.5">{message}</p>

          <button
            onClick={closeToast}
            className="absolute w-5 h-5 right-3 top-3"
            type="button"
          >
            <img src={CloseIcon} alt="close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;

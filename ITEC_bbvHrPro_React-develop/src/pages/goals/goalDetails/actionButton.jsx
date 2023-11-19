import React from "react";

import loadingIcon from "assets/icons/ic-loading.svg";
import requestIconActive from "assets/icons/ic-reload-orange.png";
import requestIconGray from "assets/icons/ic-reload.png";
import confirmIconActive from "assets/icons/ic-tick-green.png";
import confirmIconGray from "assets/icons/ic-tick.png";
import { GOAL } from "utils/constant";

const ActionButton = ({ status, isSUM, isLoading, onClick }) => {
  const isDraft = status === GOAL.DRAFT;
  const isPending = status === GOAL.PENDING;
  const isApproved = status === GOAL.APPROVED;
  const isEvaluated = status === GOAL.EVALUATED;

  const getIcon = () => {
    if (isLoading) return loadingIcon;
    if (isApproved) return confirmIconGray;
    if (isEvaluated) return confirmIconGray;

    // SUM's cases
    if (isSUM) {
      return isPending ? confirmIconActive : confirmIconGray;
    }

    // Employee's cases
    return isDraft ? requestIconActive : requestIconGray;
  };

  const getTextContent = () => {
    if (isApproved) return GOAL.APPROVED;

    if (isEvaluated) return GOAL.EVALUATED;

    // SUM's cases
    if (isSUM) {
      return isPending ? "Approve Goal" : "Approved";
    }

    // Employee's cases
    return isDraft ? "Request For Approval" : "Waiting For Approval";
  };

  const getIsDisabled = () => {
    if (isApproved || isEvaluated) return true;

    return isSUM ? isApproved : isPending;
  };

  const getStyle = () => {
    return isSUM
      ? "bg-success-100 text-success-700"
      : "bg-warning-100 text-warning-500";
  };

  return (
    <button
      disabled={getIsDisabled()}
      type="button"
      onClick={onClick}
      className={`${getStyle()} rounded-full px-4 py-2.5 flex items-center hover:shadow-md duration-300 absolute bottom-8 left-0 right-0 m-auto w-fit disabled:bg-neutral-200 disabled:text-neutral-600 disabled:pointer-events-none text-sm shadow-sm`}
    >
      <img
        className="w-5 h-5 mr-1.5 capitalize"
        src={getIcon()}
        alt="tick"
      />
      {getTextContent()}
    </button>
  );
};

export default ActionButton;

import React from "react";

import TickIcon from "assets/icons/ic-tick.png";

const ReviewButton = ({ state = "Submit", onClick }) => {
  if (state === "Submit") {
    return (
      <button
        className="bg-success-100 hover:bg-success-150 text-success-600 py-3 px-4 text-sm shadow-sm shadow-success-150 border border-success-150 rounded duration-100"
        type="button"
        onClick={onClick}
      >
        Complete & Submit
      </button>
    );
  }

  if (state === "Finalize") {
    return (
      <button
        className="bg-info-100 hover:bg-info-150 text-info-500 py-3 px-4 text-sm shadow-sm shadow-info-150 border border-info-150 rounded duration-100"
        type="button"
        onClick={onClick}
      >
        Finalize Results
      </button>
    );
  }

  if (state === "Completed") {
    return (
      <button
        disabled
        className="bg-neutral-200 text-neutral-600 py-3 px-4 text-sm shadow-sm shadow-neutral-250 border border-neutral-250 rounded cursor-pointer flex items-center"
        type="button"
        onClick={onClick}
      >
        Submitted
        <img className="ml-1.5 w-5 h-5" src={TickIcon} alt="tick" />
      </button>
    );
  }

  return null;
};

export default ReviewButton;

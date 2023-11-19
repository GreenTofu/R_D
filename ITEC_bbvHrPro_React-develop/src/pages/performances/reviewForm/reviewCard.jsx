import React from "react";

import SavedIcon from "assets/icons/saved.png";

const SavedStatus = () => (
  <div className="flex items-center">
    <p className="text-sm text-success-600 mr-1.5">Saved</p>
    <img
      className="w-4 h-4 mb-0.5"
      src={SavedIcon}
      alt="saved-icon"
    />
  </div>
);

const SavingStatus = () => (
  <div className="flex items-center">
    <p className="text-sm text-neutral-500 mr-1.5">Saving</p>
    <div className="flex justify-center items-center">
      <div
        className="w-0.5 h-0.5 bg-neutral-400 rounded-full mr-0.5 animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="w-0.5 h-0.5 bg-neutral-400 rounded-full mr-0.5 animate-bounce"
        style={{ animationDelay: "0.1s" }}
      />
      <div
        className="w-0.5 h-0.5 bg-neutral-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
    </div>
  </div>
);

const ReviewCard = ({
  title = "Card Title",
  saveStatus,
  children,
}) => {
  return (
    <div className="mt-4 shadow bg-white rounded-lg">
      <div className="bg-neutral-150 px-4 py-4 flex justify-between">
        <div className="font-nunito text-xl font-bold border-t-lg">
          {title}
        </div>

        {saveStatus === "Saving" && <SavingStatus />}
        {saveStatus === "Saved" && <SavedStatus />}
      </div>

      <div className="px-6 py-7">{children}</div>
    </div>
  );
};

export default ReviewCard;

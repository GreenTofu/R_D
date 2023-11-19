import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";

import ArrowRight from "assets/icons/arrow-right-gray.png";
import EditIcon from "assets/icons/pencil.png";
import { getFullname } from "utils/helper";

const commonProgressBarStyle =
  "rounded-lg w-24 [&>div]:h-1.5 [&>div]:rounded-lg";
const progressBarStyles = {
  gray: `${commonProgressBarStyle} bg-neutral-300 [&>div]:bg-neutral-500 `,
  yellow: `${commonProgressBarStyle} bg-secondary-200 [&>div]:bg-secondary-500`,
  green: `${commonProgressBarStyle} bg-color-1-200 [&>div]:bg-color-1-500`,
};

const CycleItem = ({ cycleItem, isHRM, onEdit }) => {
  const {
    id,
    startDate,
    endDate,
    completed = 0,
    total = 0,
    creator,
    updatedAt,
  } = cycleItem;

  const progressPercentage =
    total === 0 ? 0 : (completed / total) * 100;

  let progressBarColor;

  if (progressPercentage < 25) progressBarColor = "gray";
  else if (progressPercentage < 75) progressBarColor = "yellow";
  else progressBarColor = "green";

  const onClickEdit = (e) => {
    e.preventDefault();
    onEdit();
  };

  return (
    <Link to={`cycles/${id}`}>
      <div className="flex px-6 py-4 border-b hover:bg-neutral-100 border-neutral-200 items-center">
        <div className="basis-3/12 flex items-center">
          <p className="text-sm text-neutral-900">
            {moment(startDate).format("ll")} -{" "}
            {moment(endDate).format("ll")}
          </p>
        </div>

        <div className="basis-2/12 flex items-center pl-4">
          <div className={progressBarStyles[progressBarColor]}>
            <div style={{ width: `${progressPercentage}%` }} />
          </div>

          <p className="ml-2 text-xs text-neutral-900">
            {completed}/{total}
          </p>
        </div>

        <div className="basis-3/12 flex items-center pl-14">
          <img
            src={creator.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full border inline mr-2"
          />
          <p className="text-sm text-neutral-900">
            {getFullname(creator)}
          </p>
        </div>

        <div className="basis-3/12 flex items-center pl-4">
          <p className="text-sm text-neutral-500">
            {moment(updatedAt).calendar()}
          </p>
        </div>

        <div className="basis-1/12 justify-end flex items-center">
          {isHRM && (
            <button
              className="hover:bg-neutral-300 p-2 duration-300 rounded-full mr-2"
              type="button"
              onClick={onClickEdit}
            >
              <img className="w-5" src={EditIcon} alt="edit-button" />
            </button>
          )}

          <img
            className="w-5"
            src={ArrowRight}
            alt="arrow-right-icon"
          />
        </div>
      </div>
    </Link>
  );
};

export default CycleItem;

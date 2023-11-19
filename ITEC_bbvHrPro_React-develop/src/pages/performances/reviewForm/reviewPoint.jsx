import { isEmpty } from "lodash";
import React from "react";

const ReviewPoint = ({ point, setPoint, disabled = true }) => {
  const onChangePoint = (e) => {
    const regex = /^\d*\.?\d*?$/; // Float number regex
    let { value } = e.target;

    if (!regex.test(value)) return;

    if (isEmpty(value)) value = null;
    if (parseFloat(value) < 0) value = 0;
    if (parseFloat(value) > 5) value = 5;

    setPoint(value);
  };

  return (
    <div className="flex items-center">
      <input
        onChange={onChangePoint}
        disabled={disabled}
        className="w-12 p-1 text-center text-[11px] rounded border border-neutral-300 bg-white mr-1 disabled:bg-neutral-150"
        value={point || ""}
        placeholder={disabled ? "" : "0.0"}
      />

      <span className="text-[11px] text-neutral-500">
        / 5.0 points
      </span>
    </div>
  );
};

export default ReviewPoint;

import React from "react";

const FinalPoint = ({ finalPoint = null, maximumPoint = 5.0 }) => {
  return (
    <div>
      {finalPoint ? (
        <p className="text-neutral-500 text-sm">
          <span className="text-neutral-900 font-semibold">
            {finalPoint}
          </span>{" "}
          / {maximumPoint.toFixed(1)} points
        </p>
      ) : (
        <p className="text-neutral-500 text-sm">Not Graded</p>
      )}
    </div>
  );
};

export default FinalPoint;

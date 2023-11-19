import React, { useEffect, useRef, useState } from "react";

import EmployeeCard from "components/employeeCard";
import { getReviewStatusStyle } from "utils/helper";

import ReviewPoint from "./reviewPoint";

const ReviewContent = ({
  currentUser,
  reviewDetails,
  reviewCriteria,
  saveCriteria,
  saveFinalPoint,
  setSaveStatus,
  isFeedback,
}) => {
  const [employeeReview, setEmployeeReview] = useState({});
  const [evaluatorReview, setEvaluatorReview] = useState({});

  const [finalPoint, setFinalPoint] = useState(null);

  const isEdited = useRef(false);

  const getStatusStyle = (statusName) => {
    return getReviewStatusStyle(statusName);
  };

  const isEmployee = () => {
    return reviewDetails?.employee?.id === currentUser?.id;
  };

  const isEvaluator = () => {
    return reviewDetails?.evaluator?.id === currentUser?.id;
  };

  const isDisabledEmployee = () => {
    const isCompleted = employeeReview?.status?.name === "Completed";
    const isNotEmployee = !isEmployee();

    return isCompleted || isNotEmployee;
  };

  const isDisabledEvaluator = () => {
    const isCompleted = evaluatorReview?.status?.name === "Completed";
    const isNotEvaluator = !isEvaluator();

    return isCompleted || isNotEvaluator;
  };

  const isDisabledFinalReview = () => {
    const isNotFinalizing =
      reviewDetails?.status?.name !== "In Finalizing";
    const isNotEvaluator = !isEvaluator();

    return isNotFinalizing || isNotEvaluator;
  };

  // Set review states
  const setReview = (data) => {
    if (!isDisabledEmployee()) {
      setEmployeeReview({ ...employeeReview, ...data });
    }

    if (!isDisabledEvaluator()) {
      setEvaluatorReview({ ...evaluatorReview, ...data });
    }

    isEdited.current = true;
  };

  const setFinalReview = (point) => {
    if (!isDisabledFinalReview()) {
      setFinalPoint(point);
    }

    isEdited.current = true;
  };

  // Auto-saving reviews
  const saveReview = async (newReviewData) => {
    setSaveStatus("Saving");

    const response = await saveCriteria(newReviewData);

    if (response.status === 200) {
      setTimeout(() => {
        setSaveStatus("Saved");
      }, 1000);
    }
  };

  const saveFinalReview = async (point) => {
    setSaveStatus("Saving");

    const response = await saveFinalPoint(point);

    if (response.status === 200) {
      setTimeout(() => {
        setSaveStatus("Saved");
      }, 1000);
    }
  };

  useEffect(() => {
    const empReview = reviewCriteria?.reviews?.find(
      (item) => item?.userId === reviewDetails?.employee?.id
    );

    const evalReview = reviewCriteria?.reviews?.find(
      (item) => item?.userId === reviewDetails?.evaluator?.id
    );

    setEmployeeReview(empReview);
    setEvaluatorReview(evalReview);

    setFinalPoint(reviewCriteria.finalPoint);
  }, [reviewDetails, reviewCriteria]);

  useEffect(() => {
    if (!isEdited.current) return;

    const debounceHandler = setTimeout(() => {
      let currentReview = {};

      if (isEmployee()) currentReview = employeeReview;
      if (isEvaluator()) currentReview = evaluatorReview;

      saveReview(currentReview);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(debounceHandler);
    };
  }, [employeeReview, evaluatorReview]);

  useEffect(() => {
    if (!isEdited.current) return;

    const debounceHandler = setTimeout(() => {
      saveFinalReview(finalPoint);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(debounceHandler);
    };
  }, [finalPoint]);

  return (
    <div>
      {!isFeedback && (
        <div className="flex gap-20 mb-12">
          <div className="basis-1/2">
            <h4 className="font-bold text-sm">Description</h4>
            <p className="mt-2 text-sm whitespace-pre-line">
              {reviewCriteria?.description}
            </p>
          </div>

          <div className="basis-1/2">
            <h4 className="font-bold text-sm">Final Results</h4>

            <div className="flex items-center mt-2 justify-between">
              <div className="flex">
                <img
                  className="w-7 h-7 rounded-full"
                  src={reviewDetails?.employee?.avatar}
                  alt="employee"
                />

                <img
                  className="w-7 h-7 rounded-full"
                  src={reviewDetails?.evaluator?.avatar}
                  alt="evaluator"
                />
              </div>

              <ReviewPoint
                point={finalPoint}
                setPoint={setFinalReview}
                disabled={isDisabledFinalReview()}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-20">
        <div className="basis-1/2">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold">Self-evaluate</h3>
            <span
              className={`${getStatusStyle(
                employeeReview?.status?.name
              )} font-normal ml-2`}
            >
              {employeeReview?.status?.name}
            </span>
          </div>

          <div className="mt-3.5 flex justify-between items-center">
            <EmployeeCard employee={reviewDetails?.employee} />
            {!isFeedback && (
              <ReviewPoint
                point={employeeReview?.point}
                setPoint={(point) => setReview({ point })}
                disabled={isDisabledEmployee()}
              />
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold">Comments</h3>
            <textarea
              disabled={isDisabledEmployee()}
              className="mt-2 p-3 w-full resize-none h-24 text-xs rounded border border-gray-300 shadow-sm"
              value={employeeReview?.comment || ""}
              placeholder="Waiting for the comment..."
              onChange={(e) => setReview({ comment: e.target.value })}
            />
          </div>
        </div>

        <div className="basis-1/2">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold">Evaluator</h3>
            <span
              className={`${getStatusStyle(
                evaluatorReview?.status?.name
              )} font-normal ml-2`}
            >
              {evaluatorReview?.status?.name}
            </span>
          </div>

          <div className="mt-3.5 flex justify-between items-center">
            <EmployeeCard employee={reviewDetails?.evaluator} />
            {!isFeedback && (
              <ReviewPoint
                point={evaluatorReview?.point}
                setPoint={(point) => setReview({ point })}
                disabled={isDisabledEvaluator()}
              />
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold">Comments</h3>
            <textarea
              disabled={isDisabledEvaluator()}
              className="mt-2 p-3 w-full resize-none h-24 text-xs rounded border border-gray-300 shadow-sm"
              placeholder="Waiting for the comment..."
              value={evaluatorReview?.comment || ""}
              onChange={(e) => setReview({ comment: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;

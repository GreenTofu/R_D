import { pick } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import performanceAPI from "api/performanceAPI";
import backIcon from "assets/icons/arrow-left-tail.png";
import ConfirmModal from "components/confirmModal";
import useToastStore from "store/toastStore";
import useUserStore from "store/userStore";
import { POSITION } from "utils/constant";
import { CycleContext } from "utils/context";

import ReviewButton from "./reviewButton";
import ReviewCard from "./reviewCard";
import ReviewCriteria from "./reviewCriteria";
import ReviewDetails from "./reviewDetails";

const ReviewForm = () => {
  const { id } = useParams();
  const reviewCycle = useContext(CycleContext);
  const currentUser = useUserStore((state) => state.user);

  const [reviewDetails, setReviewDetails] = useState({});
  const [reviewParts, setReviewParts] = useState([]);

  const [submitState, setSubmitState] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const { openSuccessfulToast, openErrorToast } = useToastStore();

  const getSubmitStateByStatus = ({ details, parts }) => {
    const currentStatus = details.status.name;
    const isEvaluator = currentUser?.id === details.evaluatorId;

    let buttonState;

    // Check submit state base on review status
    switch (currentStatus) {
      case "Evaluating":
        buttonState = "Submit";
        break;
      case "In Finalizing":
        buttonState = isEvaluator ? "Finalize" : "Completed";
        break;
      default:
        buttonState = "Completed";
    }

    // Check if current user review has 'Completed' status
    const firstCriteriaReview = parts[0].criteria[0].reviews;

    const userReview = firstCriteriaReview.find(
      (rv) => rv.userId === currentUser.id
    );

    const isCompleteCriteria =
      userReview?.status?.name === "Completed";

    if (isCompleteCriteria) buttonState = "Completed";

    return buttonState;
  };

  const setReviewData = (reviewData) => {
    setReviewDetails(reviewData?.details);
    setReviewParts(reviewData?.parts);

    const buttonState = getSubmitStateByStatus(reviewData);
    setSubmitState(buttonState);
  };

  const fetchReviewForm = async () => {
    const response = await performanceAPI.getReviewDetails(id);

    const { review } = response.data;

    setReviewData(review);
  };

  const submitEvaluating = async () => {
    const response = await performanceAPI.submitEvaluate(id);
    setReviewData(response.data.review);
  };

  const submitFinalizing = async () => {
    const response = await performanceAPI.submitFinalize(id);
    setReviewData(response.data.form);
  };

  const handleSubmit = async () => {
    const buttonState = getSubmitStateByStatus({
      details: reviewDetails,
      parts: reviewParts,
    });

    setOpenConfirm(false);

    try {
      if (buttonState === "Submit") await submitEvaluating();
      if (buttonState === "Finalize") await submitFinalizing();

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        openSuccessfulToast("Your review has been submitted");
      }, 500);
    } catch (error) {
      const { message } = error.response.data;
      openErrorToast(message);
    }
  };

  const saveCriteria = (reviewData) => {
    const reviewCriteriaId = reviewData.id;

    const data = pick(reviewData, ["point", "comment"]);

    return performanceAPI.updateCriteriaEvaluation(
      reviewCriteriaId,
      data
    );
  };

  const saveCriteriaFinalPoint = (reviewData, finalPoint) => {
    const { finalizeCriteriaId } = reviewData;

    return performanceAPI.updateCriteriaFinalEvaluation(
      finalizeCriteriaId,
      finalPoint
    );
  };

  const saveGoalCriteria = (reviewData) => {
    const reviewGoalId = reviewData.id;
    const reviewCriteriaId = reviewData.criteriaId;

    const data = pick(reviewData, ["point", "comment"]);

    return performanceAPI.updateGoalEvaluation(
      reviewGoalId,
      reviewCriteriaId,
      data
    );
  };

  const saveGoalFinalPoint = (reviewData, finalPoint) => {
    const { id: goalId, finalizeCriteriaId } = reviewData;

    return performanceAPI.updateGoalFinalEvaluation(
      goalId,
      finalizeCriteriaId,
      finalPoint
    );
  };

  const saveFeedback = (reviewData) => {
    const reviewFeedbackId = reviewData.id;

    const data = pick(reviewData, ["comment"]);

    return performanceAPI.updateFeedback(reviewFeedbackId, data);
  };

  const getCyclePeriod = () => {
    const startDate = moment(reviewDetails.cycle?.startDate).format(
      "MMM DD, YYYY"
    );

    const endDate = moment(reviewDetails.cycle?.endDate).format(
      "MMM DD, YYYY"
    );

    return `${startDate} - ${endDate}`;
  };

  useEffect(() => {
    fetchReviewForm();
  }, []);

  return (
    <div className="mx-16">
      <div className="flex items-center">
        <Link to={`/performances/cycles/${reviewCycle?.id}`}>
          <img src={backIcon} className="w-6 h-6 mr-7" alt="back" />
        </Link>
        <h2 className="text-2xl font-bold">Performance Reviews</h2>
      </div>

      <div className="mt-8 mb-12 relative">
        <ReviewCard title="Review Details">
          <ReviewDetails
            currentUser={currentUser}
            review={reviewDetails}
          />
        </ReviewCard>

        <div className="absolute top-5 right-4">
          <p className="font-nunito font-bold">
            Review Cycle:
            <span className="font-normal ml-2 text-sm">
              {getCyclePeriod()}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        {reviewParts.map((part) => (
          <div className="mb-8" key={part.id}>
            <h3 className="font-bold text-2xl">
              Part {part.partNumber}: {part.partName}
            </h3>
            {part.partNumber < 3 &&
              part.criteria.map((reviewCriteria) => (
                <div key={reviewCriteria.id} className="mb-12">
                  <ReviewCriteria
                    currentUser={currentUser}
                    reviewDetails={reviewDetails}
                    reviewCriteria={reviewCriteria}
                    saveCriteria={saveCriteria}
                    saveFinalPoint={(finalPoint) =>
                      saveCriteriaFinalPoint(
                        reviewCriteria,
                        finalPoint
                      )
                    }
                  />
                </div>
              ))}

            {part.partNumber === 3 &&
              part.criteria.map((reviewGoal) => (
                <div
                  key={`${reviewGoal.id}-goal-criteria`}
                  className="mb-12"
                >
                  <ReviewCriteria
                    currentUser={currentUser}
                    reviewDetails={reviewDetails}
                    reviewCriteria={reviewGoal}
                    saveCriteria={saveGoalCriteria}
                    saveFinalPoint={(finalPoint) =>
                      saveGoalFinalPoint(reviewGoal, finalPoint)
                    }
                  />
                </div>
              ))}

            {part.partNumber === 4 &&
              part.criteria.map((feedback) => (
                <div key={feedback.id} className="mb-12">
                  <ReviewCriteria
                    currentUser={currentUser}
                    reviewDetails={reviewDetails}
                    reviewCriteria={feedback}
                    saveCriteria={saveFeedback}
                    isFeedback
                  />
                </div>
              ))}
          </div>
        ))}
      </div>

      {currentUser?.position !== POSITION.HUMAN_RESOURCE_MANAGER && (
        <div className="flex justify-end">
          <ReviewButton
            state={submitState}
            onClick={() => setOpenConfirm(true)}
          />
        </div>
      )}

      <ConfirmModal
        isOpen={openConfirm}
        title="Review"
        description="Are you sure you want to submit your review result ?"
        onConfirm={handleSubmit}
        onCancel={() => setOpenConfirm(false)}
      />
    </div>
  );
};

export default ReviewForm;

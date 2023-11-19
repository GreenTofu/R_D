import React, { useState } from "react";

import ReviewCard from "./reviewCard";
import ReviewContent from "./reviewContent";

const ReviewCriteria = ({
  reviewCriteria,
  saveCriteria,
  saveFinalPoint,
  currentUser,
  reviewDetails,
  isFeedback = false,
}) => {
  const [saveStatus, setSaveStatus] = useState(null);
  const weight = reviewCriteria.reviews[0]?.weight;

  const getCriteriaTitle = () => {
    let title = reviewCriteria?.name || reviewCriteria?.title;
    if (weight) title += ` (${weight}%)`;

    return title;
  };

  return (
    <ReviewCard title={getCriteriaTitle()} saveStatus={saveStatus}>
      <ReviewContent
        currentUser={currentUser}
        reviewDetails={reviewDetails}
        reviewCriteria={reviewCriteria}
        saveCriteria={saveCriteria}
        saveFinalPoint={saveFinalPoint}
        setSaveStatus={setSaveStatus}
        isFeedback={isFeedback}
      />
    </ReviewCard>
  );
};

export default ReviewCriteria;

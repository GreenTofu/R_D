import axios from "api/axios";

const getCycleList = async () => {
  const response = await axios.get("performance-reviews/cycles");

  return response;
};

const getCycleInfo = async (cycleId) => {
  const response = await axios.get(
    `performance-reviews/cycles/${cycleId}`
  );

  return response;
};

const createCycle = async (cycleData) => {
  const response = await axios.post(
    "performance-reviews/cycles",
    cycleData
  );

  return response;
};

const updateCycleInfo = async (cycleId, cycleData) => {
  const response = await axios.put(
    `performance-reviews/cycles/${cycleId}`,
    cycleData
  );

  return response;
};

const getReviewDetails = async (id) => {
  const response = await axios.get(`performance-reviews/${id}`);

  return response;
};

const getReviewList = async (cycleId, params) => {
  const response = await axios.get(
    `performance-reviews/cycles/${cycleId}/reviews`,
    { params }
  );

  return response;
};

const getCriterias = async () => {
  const response = await axios.get("criteria");

  return response;
};

const getAssigneeList = async (cycleId, params) => {
  const response = await axios.get(
    `performance-reviews/cycles/${cycleId}/assignees`,
    {
      params,
    }
  );

  return response;
};

const createPerformanceReview = async (
  cycleID,
  performanceReviewData
) => {
  const response = await axios.post(
    `performance-reviews/cycles/${cycleID}/bulk-create`,
    performanceReviewData
  );

  return response;
};

const updateCriteriaEvaluation = async (
  reviewCriteriaId,
  evaluatedCriteriaData
) => {
  const response = await axios.put(
    `performance-reviews/criteria/${reviewCriteriaId}`,
    evaluatedCriteriaData
  );

  return response;
};

const updateCriteriaFinalEvaluation = async (
  finalizeCriteriaId,
  finalPoint
) => {
  const response = await axios.put(
    `performance-reviews/criteria/${finalizeCriteriaId}/finalize`,
    { finalPoint }
  );

  return response;
};

const updateGoalEvaluation = async (
  reviewGoalId,
  reviewCriteriaId,
  data
) => {
  const response = await axios.put(
    `performance-reviews/review-goal/${reviewGoalId}`,
    { reviewCriteriaId, ...data }
  );

  return response;
};

const updateGoalFinalEvaluation = async (
  goalId,
  finalizeCriteriaId,
  finalPoint
) => {
  const response = await axios.put(
    `performance-reviews/goal/${goalId}/finalize`,
    { finalizeCriteriaId, finalPoint }
  );

  return response;
};

const updateFeedback = async (reviewFeedbackId, data) => {
  const response = await axios.put(
    `performance-reviews/feedback/${reviewFeedbackId}`,
    data
  );

  return response;
};

const submitEvaluate = async (reviewId) => {
  const response = await axios.put(
    `performance-reviews/${reviewId}/submit-evaluating`
  );

  return response;
};

const submitFinalize = async (reviewId) => {
  const response = await axios.put(
    `performance-reviews/${reviewId}/finalize`
  );

  return response;
};

const performanceAPI = {
  getCycleList,
  getReviewDetails,
  getCycleInfo,
  updateCycleInfo,
  createCycle,
  getReviewList,
  getCriterias,
  getAssigneeList,
  createPerformanceReview,
  updateCriteriaEvaluation,
  updateCriteriaFinalEvaluation,
  updateGoalEvaluation,
  updateGoalFinalEvaluation,
  updateFeedback,
  submitEvaluate,
  submitFinalize,
};

export default performanceAPI;

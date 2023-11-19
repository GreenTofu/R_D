import { StatusCodes } from 'http-status-codes';
import { merge, omit } from 'lodash';
import { Op, literal } from 'sequelize';

import {
  PerformanceReview,
  PerformanceReviewCriteria,
  PerformanceReviewGoal,
  PerformanceReviewStatus,
  PerformanceReviewCycle,
  PerformanceReviewFinalizeCriteria,
  CriteriaPart,
  Criteria,
  Goal,
  GoalStatus,
  User,
  PerformanceReviewFeedback,
  Feedback,
} from 'models';
import { USER_ATTRIBUTES } from 'utils/constant';
import ErrorWithStatusCode from 'utils/errors';
import { searchByFullName } from 'utils/function';

const getViewAuthorizedUserIds = (review, currentUser) => {
  const { position } = currentUser;
  const { employeeId, evaluatorId, status } = review;

  // Human Resources can view both employee and evaluator
  if (position === 'Human Resources') {
    return [employeeId, evaluatorId];
  }

  // User is not authorized to view review
  if (
    currentUser.id !== employeeId &&
    currentUser.id !== evaluatorId
  ) {
    throw new ErrorWithStatusCode(
      'Permission denied',
      StatusCodes.UNAUTHORIZED,
    );
  }

  // User can only view their own review when still evaluating
  if (status.name === 'Evaluating') {
    return [currentUser.id];
  }

  // On finalizing phase, evaluator can view both review data
  if (status.name === 'In Finalizing') {
    if (employeeId === currentUser.id) return [currentUser.id];
    return [employeeId, evaluatorId];
  }

  // User can view both employee and evaluator review
  if (status.name === 'Completed') {
    return [employeeId, evaluatorId];
  }

  return [];
};

const getReviewForm = async (reviewId, currentUser) => {
  // Get performance review details data
  const reviewDetails = await PerformanceReview.findOne({
    include: [
      {
        model: PerformanceReviewStatus,
        as: 'status',
      },
      {
        model: User,
        as: 'evaluator',
        attributes: USER_ATTRIBUTES,
      },
      {
        model: User,
        as: 'employee',
        attributes: USER_ATTRIBUTES,
      },
      {
        model: PerformanceReviewCycle,
        as: 'cycle',
      },
    ],
    where: {
      id: reviewId,
    },
  });

  const allowedUserIds = getViewAuthorizedUserIds(
    reviewDetails,
    currentUser,
  );

  // Get criteria evaluated points and comments
  const parts = await CriteriaPart.findAll();

  const baseCriteria = await Criteria.findAll();

  const reviewCriteria = await PerformanceReviewCriteria.findAll({
    include: [
      {
        model: PerformanceReviewStatus,
        as: 'status',
      },
    ],
    attributes: [
      'id',
      'weight',
      'criteriaId',
      'statusId',
      'userId',
      'point',
      'comment',
    ],
    where: {
      performanceReviewId: reviewId,
    },
  });

  reviewCriteria.forEach((review, index) => {
    if (allowedUserIds.includes(review.userId)) return;

    reviewCriteria[index] = {
      ...review.toJSON(),
      point: null,
      comment: null,
    };
  });

  const finalCriteria =
    await PerformanceReviewFinalizeCriteria.findAll({
      attributes: ['id', 'weight', 'criteriaId', 'point'],
      where: {
        performanceReviewId: reviewId,
      },
    });

  finalCriteria.forEach((review, index) => {
    if (allowedUserIds.includes(reviewDetails.evaluatorId)) return;

    finalCriteria[index] = {
      ...review.toJSON(),
      point: null,
    };
  });

  const reviewParts = parts.map((part) => ({
    id: part.id,
    partName: part.partName,
    partNumber: part.partNumber,
    criteria: baseCriteria
      .filter((criterion) => criterion.partId === part.id)
      .map((criterion) => ({
        ...criterion.toJSON(),
        finalizeCriteriaId: finalCriteria.find(
          (review) => review.criteriaId === criterion.id,
        ).id,
        finalPoint: finalCriteria.find(
          (review) => review.criteriaId === criterion.id,
        ).point,
        reviews: reviewCriteria.filter(
          (review) => review.criteriaId === criterion.id,
        ),
      })),
  }));

  // Get evaluated goal setting reviews

  const reviewGoals = await PerformanceReviewGoal.findAll({
    attributes: ['id', 'userId', 'goalId', 'point', 'comment'],
    where: {
      performanceReviewId: reviewId,
    },
    include: [
      {
        model: Goal,
        as: 'goal',
      },
      {
        model: PerformanceReviewStatus,
        as: 'status',
      },
    ],
  });

  const part3Index = reviewParts.findIndex(
    (part) => part.partNumber === 3,
  );

  const mappedGoals = [];

  const goalList = await Goal.findAll({
    where: {
      id: { [Op.in]: reviewGoals.map((review) => review.goalId) },
    },
  });

  const goalCriteria = reviewParts[part3Index].criteria[0];

  const finalGoalCriteria =
    await PerformanceReviewFinalizeCriteria.findOne({
      attributes: ['id'],
      where: {
        performanceReviewId: reviewId,
        criteriaId: goalCriteria.id,
      },
    });

  reviewGoals.forEach((review) => {
    const goalReview = goalCriteria.reviews.find(
      (item) => item.userId === review.userId,
    );

    const reviewData = {
      criteriaId: goalReview.id,
      weight: goalReview.weight / goalList.length,
      ...omit(review.toJSON(), 'goal'),
    };

    const isAuthorized = allowedUserIds.includes(review.userId);

    if (!isAuthorized) {
      const hiddenReview = { point: null, comment: null };
      merge(reviewData, hiddenReview);
    }

    const index = mappedGoals.findIndex(
      (goal) => goal.id === review.goal.id,
    );

    if (index >= 0) {
      mappedGoals[index].reviews.push(reviewData);
    } else {
      mappedGoals.push({
        ...review.goal.toJSON(),
        ...(allowedUserIds.includes(reviewDetails.evaluatorId) || {
          finalPoint: null,
        }),
        finalizeCriteriaId: finalGoalCriteria.id,
        reviews: [reviewData],
      });
    }
  });

  reviewParts[part3Index].criteria = mappedGoals;

  // Get feedback

  const baseFeedback = await Feedback.findAll();

  const reviewFeedback = await PerformanceReviewFeedback.findAll({
    include: [
      {
        model: PerformanceReviewStatus,
        as: 'status',
      },
    ],
    attributes: ['id', 'feedbackId', 'statusId', 'userId', 'comment'],
    where: {
      performanceReviewId: reviewId,
    },
  });

  reviewFeedback.forEach((review, index) => {
    if (allowedUserIds.includes(review.userId)) return;

    reviewFeedback[index] = {
      ...review.toJSON(),
      comment: null,
    };
  });
  const part4Index = reviewParts.findIndex(
    (part) => part.partNumber === 4,
  );

  const feedbackData = baseFeedback.map((feedback) => ({
    ...feedback.toJSON(),
    reviews: reviewFeedback.filter(
      (review) => review.feedbackId === feedback.id,
    ),
  }));

  reviewParts[part4Index].criteria = feedbackData;

  return {
    details: reviewDetails,
    parts: reviewParts,
  };
};

const getAssigneeList = async (query, cycle) => {
  const { search = '', role = 'All' } = query;

  const queryToken = `%${search}%`;
  const nameQuery = searchByFullName(queryToken, 'User');

  const assignees = await User.findAll({
    include: [
      {
        model: PerformanceReview,
        as: 'selfReviews',
        where: {
          cycleId: cycle,
        },
      },
    ],
  });

  const employee = assignees.map((emp) => emp.id);

  const assigneeList = await User.findAll({
    where: {
      [Op.and]: [
        role !== 'All' && { role },
        search && {
          [Op.or]: [
            nameQuery,
            {
              position: { [Op.iLike]: queryToken },
            },
          ],
        },
        role !== 'Manager' && { id: { [Op.notIn]: employee } },
        { role: { [Op.not]: 'Candidate' } },
        { position: { [Op.not]: 'Human Resources' } },
      ],
    },
  });

  return assigneeList;
};

const getReviewListByCycle = async (cycleId, user, query = {}) => {
  const { limit = 10, page = 1, search = '' } = query;
  const offset = (page - 1) * limit;
  const queryToken = `%${search}%`;

  const isHR = user.position === 'Human Resources';
  const reviewList = await PerformanceReview.findAndCountAll({
    include: [
      {
        model: PerformanceReviewStatus,
        as: 'status',
      },
      {
        model: User,
        as: 'evaluator',
        attributes: USER_ATTRIBUTES,
      },
      {
        model: User,
        as: 'employee',
        attributes: USER_ATTRIBUTES,
      },
    ],
    where: {
      cycleId,
      [Op.and]: [
        !isHR && {
          [Op.or]: [
            { '$evaluator.id$': user.id },
            { '$employee.id$': user.id },
          ],
        },
        {
          [Op.or]: [
            searchByFullName(queryToken, 'evaluator'),
            searchByFullName(queryToken, 'employee'),
            { '$status.name$': { [Op.iLike]: queryToken } },
          ],
        },
      ],
    },
    order: [
      literal(`"employeeId" = ${user.id} DESC`),
      literal(`"evaluatorId" = ${user.id} DESC`),
    ],
    limit,
    offset,
  });

  return reviewList;
};

const getReviewCycle = async (cycleId) => {
  const cycle = await PerformanceReviewCycle.findOne({
    where: { id: cycleId },
    include: {
      model: User,
      as: 'creator',
      attributes: USER_ATTRIBUTES,
    },
  });
  return cycle;
};

const createReviewCycle = async (cycleData) => {
  const newCycle = await PerformanceReviewCycle.create(cycleData);
  const cycle = await getReviewCycle(newCycle.id);
  return cycle;
};

const editReviewCycle = async (cycleData, cycleId) => {
  await PerformanceReviewCycle.update(cycleData, {
    where: { id: cycleId },
  });
  const cycle = await getReviewCycle(cycleId);
  return cycle;
};

const createPerformanceReview = async (reviewData, cycleId) => {
  const { employeeIds, criteria, evaluatorId } = reviewData;

  const feedbacks = await Feedback.findAll();

  // get evaluating status for creating Review
  const evaluatingStatus = await PerformanceReviewStatus.findOne({
    where: { name: 'Evaluating' },
  });

  // create array of Review objects by list of employee
  const reviews = employeeIds.map((emp) => ({
    employeeId: emp,
    evaluatorId,
    cycleId,
    statusId: evaluatingStatus.id,
  }));

  // create Reviews and get their Ids
  const performanceReviews = await PerformanceReview.bulkCreate(
    reviews,
  );

  // get cycle detail to find startDate, endDate
  const cycle = await getReviewCycle(cycleId);

  // get all approved Employee goals, for the next filter
  const approvedGoal = await Goal.findAll({
    where: {
      userId: employeeIds,
      endDate: {
        [Op.lte]: cycle.endDate,
      },
    },
    include: [
      {
        model: GoalStatus,
        attributes: ['id', 'name'],
        as: 'status',
        where: { name: 'Approved' },
      },
    ],
  });

  const reviewCriteria = [];
  const reviewGoal = [];
  const reviewFeedback = [];
  const finalizeData = [];

  performanceReviews.forEach((reviewForm) => {
    // Each Review have all criteria with their weights, one for self-evaluate and one for evaluator
    criteria.forEach((criterion) => {
      finalizeData.push({
        performanceReviewId: reviewForm.id,
        criteriaId: criterion.id,
        weight: criterion.weight,
      });

      reviewCriteria.push({
        performanceReviewId: reviewForm.id,
        userId: reviewForm.evaluatorId,
        criteriaId: criterion.id,
        weight: criterion.weight,
        statusId: evaluatingStatus.id,
      });

      reviewCriteria.push({
        performanceReviewId: reviewForm.id,
        userId: reviewForm.employeeId,
        criteriaId: criterion.id,
        weight: criterion.weight,
        statusId: evaluatingStatus.id,
      });
    });
    feedbacks.forEach((feedback) => {
      reviewFeedback.push({
        performanceReviewId: reviewForm.id,
        userId: reviewForm.evaluatorId,
        feedbackId: feedback.id,
        statusId: evaluatingStatus.id,
      });

      reviewFeedback.push({
        performanceReviewId: reviewForm.id,
        userId: reviewForm.employeeId,
        feedbackId: feedback.id,
        statusId: evaluatingStatus.id,
      });
    });

    // Get approved goals by Review.employeeId
    const empGoal = approvedGoal.filter(
      (goal) => goal.userId === reviewForm.employeeId,
    );

    // Each Review have all approved goal, one for self-evaluate and one for evaluator
    empGoal.forEach((goal) => {
      reviewGoal.push({
        performanceReviewId: reviewForm.id,
        userId: reviewForm.evaluatorId,
        goalId: goal.id,
        statusId: evaluatingStatus.id,
      });
      reviewGoal.push({
        performanceReviewId: reviewForm.id,
        userId: reviewForm.employeeId,
        goalId: goal.id,
        statusId: evaluatingStatus.id,
      });
    });
  });
  await PerformanceReviewCriteria.bulkCreate(reviewCriteria);
  await PerformanceReviewGoal.bulkCreate(reviewGoal);
  await PerformanceReviewFeedback.bulkCreate(reviewFeedback);
  await PerformanceReviewFinalizeCriteria.bulkCreate(finalizeData);

  return performanceReviews;
};

const getCriterion = async (criterionId) => {
  const criterionDetail = await PerformanceReviewCriteria.findOne({
    where: { id: criterionId },
  });
  return criterionDetail;
};

const getFinalizeCriterionData = async (criterionId) => {
  const criterionDetail =
    await PerformanceReviewFinalizeCriteria.findOne({
      where: { id: criterionId },
    });
  return criterionDetail;
};

const saveCriteria = async (reviewData, criteriaId) => {
  await PerformanceReviewCriteria.update(
    { point: reviewData.point, comment: reviewData.comment },
    {
      where: { id: criteriaId },
    },
  );
  const result = await getCriterion(criteriaId);
  return result;
};

const saveGoalPoint = async (reviewData, goalId) => {
  await PerformanceReviewGoal.update(
    { point: reviewData.point, comment: reviewData.comment },
    {
      where: { id: goalId },
    },
  );
  const result = await PerformanceReviewGoal.findOne({
    where: { id: goalId },
  });
  return result;
};

const saveGoalCriteria = async (reviewData) => {
  const goalCriterion = await PerformanceReviewCriteria.findOne({
    where: { id: reviewData.reviewCriteriaId },
  });

  const reviewGoals = await PerformanceReviewGoal.findAll({
    where: {
      performanceReviewId: goalCriterion.performanceReviewId,
    },
  });

  let point = 0;
  reviewGoals.forEach((goal) => {
    point += goal.point;
  });
  reviewData.point = point / reviewGoals.length;

  const result = await saveCriteria(
    reviewData,
    reviewData.reviewCriteriaId,
  );
  return result;
};

const getCycleList = async (query, user) => {
  const { limit = 10, page = 1, search = '' } = query;
  const offset = (page - 1) * limit;
  const queryToken = `%${search}%`;

  // Get review cycle list
  const cycleList = await PerformanceReviewCycle.findAndCountAll({
    include: [
      {
        model: User,
        as: 'creator',
        attributes: USER_ATTRIBUTES,
      },
    ],
    where: {
      [Op.and]: [
        search && {
          [Op.or]: [searchByFullName(queryToken, 'creator')],
        },
      ],
    },
    limit,
    offset,
    order: [['id', 'DESC']],
  });

  // Add number of completed/total form
  const result = {};
  result.rows = [];

  await Promise.all(
    cycleList.rows.map(async (cycle) => {
      const reviewForm = await getReviewListByCycle(cycle.id, user);

      cycle.dataValues.total = reviewForm.count;
      cycle.dataValues.completed = reviewForm.rows.filter(
        (form) => form.status.name === 'Completed',
      ).length;

      if (
        user.position === 'Human Resources' ||
        reviewForm.count !== 0
      ) {
        result.rows.push(cycle);
      }
    }),
  );
  result.count = result.rows.length;
  return result;
};

const evaluatingSubmit = async (reviewId, currentUser) => {
  const completeStatus = await PerformanceReviewStatus.findOne({
    where: { name: 'Completed' },
    attribute: ['id'],
  });

  await PerformanceReviewCriteria.update(
    { statusId: completeStatus.id },
    {
      where: {
        performanceReviewId: reviewId,
        userId: currentUser.id,
      },
    },
  );

  await PerformanceReviewGoal.update(
    { statusId: completeStatus.id },
    {
      where: {
        performanceReviewId: reviewId,
        userId: currentUser.id,
      },
    },
  );

  await PerformanceReviewFeedback.update(
    { statusId: completeStatus.id },
    {
      where: {
        performanceReviewId: reviewId,
        userId: currentUser.id,
      },
    },
  );
};

const moveToFinalize = async (reviewId) => {
  const completeStatus = await PerformanceReviewStatus.findOne({
    where: { name: 'Completed' },
    attribute: ['id'],
  });

  // Get criteria again, to check all are completed
  const reviewCriteria = await PerformanceReviewCriteria.findAll({
    where: {
      performanceReviewId: reviewId,
    },
  });

  // get not completed criteria, to check if all are completed
  const isAllCompleteCriteria = reviewCriteria.every(
    (form) => form.statusId === completeStatus.id,
  );

  if (!isAllCompleteCriteria) return false;

  // Get goal again, to check all are completed
  const reviewGoal = await PerformanceReviewGoal.findAll({
    where: {
      performanceReviewId: reviewId,
    },
  });

  // get not completed goal, to check if all are completed
  const isAllCompleteGoal = reviewGoal.every(
    (form) => form.statusId === completeStatus.id,
  );

  if (!isAllCompleteGoal) return false;

  // Get feedback again, to check all are completed
  const reviewFeedback = await PerformanceReviewGoal.findAll({
    where: {
      performanceReviewId: reviewId,
    },
  });

  // get not completed criteria, to check if all are completed
  const isAllCompleteFeedback = reviewFeedback.every(
    (form) => form.statusId === completeStatus.id,
  );

  if (!isAllCompleteFeedback) return false;

  // change the review form to "In Finalizing"
  const finalizeStatus = await PerformanceReviewStatus.findOne({
    where: { name: 'In Finalizing' },
    attribute: ['id'],
  });

  const review = await PerformanceReview.findOne({
    where: { id: reviewId },
  });

  review.statusId = finalizeStatus.id;

  await review.save();

  // update criteria status of evaluator to finalizing
  await PerformanceReviewCriteria.update(
    { statusId: finalizeStatus.id },
    {
      where: {
        performanceReviewId: reviewId,
        userId: review.evaluatorId,
      },
    },
  );

  // update goal status of evaluator to finalizing
  await PerformanceReviewGoal.update(
    { statusId: finalizeStatus.id },
    {
      where: {
        performanceReviewId: reviewId,
        userId: review.evaluatorId,
      },
    },
  );

  // update feedback status of evaluator to finalizing
  await PerformanceReviewFeedback.update(
    { statusId: finalizeStatus.id },
    {
      where: {
        performanceReviewId: reviewId,
        userId: review.evaluatorId,
      },
    },
  );

  return true;
};

const saveGoalFinalPoint = async (goalId, data) => {
  await Goal.update(
    { finalPoint: data.finalPoint },
    { where: { id: goalId } },
  );

  const result = await Goal.findOne({
    where: { id: goalId },
  });
  return result;
};

const saveFinalizeCriteria = async (
  reviewData,
  finalizeCriteriaId,
) => {
  await PerformanceReviewFinalizeCriteria.update(
    { point: reviewData.finalPoint },
    {
      where: { id: finalizeCriteriaId },
    },
  );
  const result = await getFinalizeCriterionData(finalizeCriteriaId);
  return result;
};

const saveGoalFinalizeToCriteria = async (reviewData) => {
  const goalCriterion =
    await PerformanceReviewFinalizeCriteria.findOne({
      where: { id: reviewData.finalizeCriteriaId },
    });

  const reviewGoals = await Goal.findAll({
    include: {
      model: PerformanceReview,
      as: 'performanceReview',
      where: {
        id: goalCriterion.performanceReviewId,
      },
    },
  });

  let point = 0;
  reviewGoals.forEach((goal) => {
    point += goal.finalPoint;
  });
  reviewData.point = point / reviewGoals.length;

  const result = await saveFinalizeCriteria(
    reviewData,
    reviewData.finalizeCriteriaId,
  );
  return result;
};

const finalizingSubmit = async (formId, evaluator) => {
  const reviewGoals = await PerformanceReviewGoal.findAll({
    where: { performanceReviewId: formId, userId: evaluator.id },
  });

  const evaluatedStatus = await GoalStatus.findOne({
    where: { name: 'Evaluated' },
  });

  const goalIds = reviewGoals.map((goal) => goal.goalId);

  // update goal of evaluator to evaluated
  await Goal.update(
    {
      statusId: evaluatedStatus.id,
    },
    {
      where: { id: { [Op.in]: goalIds } },
    },
  );

  const completeStatus = await PerformanceReviewStatus.findOne({
    where: { name: 'Completed' },
    attribute: ['id'],
  });

  await PerformanceReviewFeedback.update(
    { statusId: completeStatus.id },
    {
      where: {
        performanceReviewId: formId,
        userId: evaluator.id,
      },
    },
  );
  const review = await PerformanceReview.findOne({
    where: { id: formId },
  });

  // update criteria status of evaluator to complete
  await PerformanceReviewCriteria.update(
    { statusId: completeStatus.id },
    {
      where: {
        performanceReviewId: formId,
        userId: review.evaluatorId,
      },
    },
  );

  // update criteria status of evaluator to complete
  await PerformanceReviewGoal.update(
    { statusId: completeStatus.id },
    {
      where: {
        performanceReviewId: formId,
        userId: review.evaluatorId,
      },
    },
  );

  const finalizingPoints =
    await PerformanceReviewFinalizeCriteria.findAll({
      where: {
        performanceReviewId: formId,
      },
    });

  let finalPoint = 0;

  finalizingPoints.forEach((form) => {
    finalPoint += (form.point * form.weight) / 100;
  });

  // update performance review point
  review.finalPoint = finalPoint.toFixed(2);

  // update performance review to complete
  review.statusId = completeStatus.id;

  await review.save();

  const result = await getReviewForm(formId, evaluator);

  return result;
};

const saveFeedback = async (feedbackId, data) => {
  await PerformanceReviewFeedback.update(
    { comment: data.comment },
    {
      where: { id: feedbackId },
    },
  );

  const result = await PerformanceReviewFeedback.findOne({
    where: { id: feedbackId },
  });
  return result;
};

const PerformanceReviewServices = {
  create: createPerformanceReview,
  getAssigneeList,
  getReviewListByCycle,
  getReviewForm,
  getCriterion,
  saveCriteria,
  saveGoalPoint,
  saveGoalCriteria,
  getCycleList,
  createReviewCycle,
  editReviewCycle,
  getReviewCycle,
  saveGoalFinalPoint,
  finalizingSubmit,
  evaluatingSubmit,
  moveToFinalize,
  saveGoalFinalizeToCriteria,
  saveFinalizeCriteria,
  saveFeedback,
};
export default PerformanceReviewServices;

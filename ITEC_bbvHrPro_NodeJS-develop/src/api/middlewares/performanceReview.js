import { celebrate, Joi, Segments } from 'celebrate';
import StatusCodes from 'http-status-codes';
import { Op } from 'sequelize';

import {
  PerformanceReviewFinalizeCriteria,
  PerformanceReviewCriteria,
  PerformanceReviewGoal,
  Goal,
} from 'models';

const createBulkReviewValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    evaluatorId: Joi.number().required(),
    employeeIds: Joi.array().required(),
    criteria: Joi.array().items(
      Joi.object().keys({
        id: Joi.number().required(),
        weight: Joi.number().required(),
      }),
    ),
  }),
});

const createReviewCycleValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    empDueDate: Joi.date().required(),
    evalDueDate: Joi.date().required(),
  }),
});

const editReviewCycleValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    startDate: Joi.date(),
    endDate: Joi.date(),
    empDueDate: Joi.date(),
    evalDueDate: Joi.date(),
  }),
});

const getAssigneeValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    role: Joi.string().valid('All', 'Manager', 'Employee').allow(''),
    search: Joi.string().allow(null).allow(''),
  }),
});

const saveReviewCriterionValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    point: Joi.number().min(0).max(5).allow(null),
    comment: Joi.string().allow(null).allow(''),
  }),
});

const saveGoalCriteriaValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    reviewCriteriaId: Joi.number().required(),
    point: Joi.number().min(0).max(5).allow(null),
    comment: Joi.string().allow(null).allow(''),
  }),
});

const checkNullEvaluatingPoint = async (req, res, next) => {
  const { id: reviewId } = req.params;
  const currentUser = req.user;

  const reviewCriteria = await PerformanceReviewCriteria.findAll({
    where: {
      performanceReviewId: reviewId,
      userId: currentUser.id,
    },
  });

  const reviewGoal = await PerformanceReviewGoal.findAll({
    where: {
      performanceReviewId: reviewId,
      userId: currentUser.id,
    },
  });

  // Check all criteria have point, return true or false
  const haveAllPointCriteriaByUser = reviewCriteria.every(
    (form) => form.point !== null,
  );

  // Check all goals have point, return true or false
  const haveAllPointGoalByUser = reviewGoal.every(
    (form) => form.point !== null,
  );

  // if all are having point, do next step
  if (haveAllPointCriteriaByUser && haveAllPointGoalByUser) {
    return next();
  }

  // return error if one point are not exist
  return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Some criteria have not been evaluated yet',
  });
};

const saveGoalFinalPointValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    finalizeCriteriaId: Joi.number().required(),
    finalPoint: Joi.number().min(0).max(5).allow(null),
  }),
});

const saveCriteriaFinalPointValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    finalPoint: Joi.number().min(0).max(5).allow(null),
  }),
});

const isEvaluatedGoalAndCriteria = async (req, res, next) => {
  const reviewGoals = await PerformanceReviewGoal.findAll({
    where: {
      performanceReviewId: req.params.id,
      userId: req.user.id,
    },
  });

  const goalIds = reviewGoals.map((goal) => goal.goalId);

  const goals = await Goal.findAll({
    where: {
      id: { [Op.in]: goalIds },
    },
  });

  const finalizeCriteria =
    await PerformanceReviewFinalizeCriteria.findAll({
      where: {
        performanceReviewId: req.params.id,
      },
    });

  const haveAllFinalizePointGoalByUser = goals.every(
    (form) => form.finalPoint !== null,
  );

  const haveAllFinalizePointCriteriaByUser = finalizeCriteria.every(
    (form) => form.point !== null,
  );

  if (
    haveAllFinalizePointGoalByUser &&
    haveAllFinalizePointCriteriaByUser
  ) {
    return next();
  }

  return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Some final criteria points have not been evaluated yet',
  });
};

const saveFeedbackValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    comment: Joi.string().allow(null).allow(''),
  }),
});

export {
  createBulkReviewValidator,
  getAssigneeValidator,
  saveReviewCriterionValidator,
  saveGoalCriteriaValidator,
  createReviewCycleValidator,
  editReviewCycleValidator,
  checkNullEvaluatingPoint,
  saveGoalFinalPointValidator,
  saveFeedbackValidator,
  isEvaluatedGoalAndCriteria,
  saveCriteriaFinalPointValidator,
};

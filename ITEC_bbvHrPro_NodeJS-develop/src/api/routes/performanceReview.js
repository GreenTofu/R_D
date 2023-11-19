import express from 'express';

import {
  createReviewCycleValidator,
  editReviewCycleValidator,
  createBulkReviewValidator,
  getAssigneeValidator,
  saveReviewCriterionValidator,
  saveGoalCriteriaValidator,
  saveGoalFinalPointValidator,
  isEvaluatedGoalAndCriteria,
  checkNullEvaluatingPoint,
  saveFeedbackValidator,
  saveCriteriaFinalPointValidator,
} from 'api/middlewares/performanceReview';
import { isUser, isManager } from 'api/middlewares/permission';
import PerformanceReviewServices from 'services/performanceReview';

const performanceReviewRouter = express.Router();

performanceReviewRouter.use(isUser);

performanceReviewRouter.get(
  '/cycles/:id/assignees',
  getAssigneeValidator,
  async (req, res, next) => {
    try {
      const { id: cycleId } = req.params;
      const assigneeList =
        await PerformanceReviewServices.getAssigneeList(
          req.query,
          cycleId,
        );

      res.json({
        message: 'Get assignee list successfully',
        assigneeList,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.get('/cycles', async (req, res, next) => {
  try {
    const cycleList = await PerformanceReviewServices.getCycleList(
      req.query,
      req.user,
    );

    res.json({
      message: 'Get cycle list successfully',
      cycleList,
    });
  } catch (err) {
    next(err);
  }
});

performanceReviewRouter.get('/cycles/:id', async (req, res, next) => {
  try {
    const { id: cycleId } = req.params;

    const cycle = await PerformanceReviewServices.getReviewCycle(
      cycleId,
    );
    res.json({
      message: 'Get performance reviews cycle successfully',
      cycle,
    });
  } catch (err) {
    next(err);
  }
});

performanceReviewRouter.put(
  '/cycles/:id',
  isManager,
  editReviewCycleValidator,
  async (req, res, next) => {
    try {
      const { id: cycleId } = req.params;
      const cycleData = req.body;
      const cycle = await PerformanceReviewServices.editReviewCycle(
        cycleData,
        cycleId,
      );
      res.json({
        message: 'Update performance reviews cycle successfully',
        cycle,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.post(
  '/cycles',
  isManager,
  createReviewCycleValidator,
  async (req, res, next) => {
    try {
      const cycleData = req.body;
      cycleData.creatorId = req.user.id;
      const cycle = await PerformanceReviewServices.createReviewCycle(
        cycleData,
      );
      res.json({
        message: 'Create performance reviews cycle successfully',
        cycle,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.get(
  '/cycles/:id/reviews',
  async (req, res, next) => {
    try {
      const { id: cycleId } = req.params;
      const reviewList =
        await PerformanceReviewServices.getReviewListByCycle(
          cycleId,
          req.user,
          req.query,
        );
      res.json({
        message: 'Get review list by cycle successfully',
        reviewList,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    const review = await PerformanceReviewServices.getReviewForm(
      id,
      currentUser,
    );

    res.json({
      message: 'Get review form data successfully',
      review,
    });
  } catch (err) {
    next(err);
  }
});

performanceReviewRouter.put(
  '/criteria/:id',
  saveReviewCriterionValidator,
  async (req, res, next) => {
    try {
      const reviewData = req.body;
      const criteriaId = req.params.id;
      const criterion = await PerformanceReviewServices.saveCriteria(
        reviewData,
        criteriaId,
      );
      res.json({
        message: 'Save evaluated criterion successfully',
        criterion,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.put(
  '/review-goal/:id',
  saveGoalCriteriaValidator,
  async (req, res, next) => {
    try {
      const reviewData = req.body;
      const goalId = req.params.id;

      const reviewGoal =
        await PerformanceReviewServices.saveGoalPoint(
          reviewData,
          goalId,
        );

      const goalCriterion =
        await PerformanceReviewServices.saveGoalCriteria(reviewData);

      res.json({
        message: 'Save evaluated goals successfully',
        reviewGoal,
        goalCriterion,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.post(
  '/cycles/:id/bulk-create',
  isManager,
  createBulkReviewValidator,
  async (req, res, next) => {
    try {
      const performanceReviewData = req.body;
      const { id: cycleId } = req.params;
      const reviewList = await PerformanceReviewServices.create(
        performanceReviewData,
        cycleId,
      );
      res.json({
        message:
          'Create all performance reviews in cycle successfully',
        reviewList,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.put(
  '/:id/submit-evaluating',
  checkNullEvaluatingPoint,
  async (req, res, next) => {
    try {
      const { id: reviewId } = req.params;

      await PerformanceReviewServices.evaluatingSubmit(
        reviewId,
        req.user,
      );

      await PerformanceReviewServices.moveToFinalize(reviewId);

      const review = await PerformanceReviewServices.getReviewForm(
        reviewId,
        req.user,
      );

      res.json({
        message: 'Submit evaluating results successfully',
        review,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.put(
  '/goal/:id/finalize',
  saveGoalFinalPointValidator,
  async (req, res, next) => {
    try {
      const { id: goalId } = req.params;
      const data = req.body;
      const goal = await PerformanceReviewServices.saveGoalFinalPoint(
        goalId,
        data,
      );

      const goalCriterion =
        await PerformanceReviewServices.saveGoalFinalizeToCriteria(
          data,
        );

      res.json({
        message: 'Save goal final point successfully',
        goal,
        goalCriterion,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.put(
  '/criteria/:id/finalize',
  saveCriteriaFinalPointValidator,
  async (req, res, next) => {
    try {
      const { id: finalCriteriaId } = req.params;
      const data = req.body;
      const criteria =
        await PerformanceReviewServices.saveFinalizeCriteria(
          data,
          finalCriteriaId,
        );

      res.json({
        message: "Save criteria's final point successfully",
        criteria,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.put(
  '/:id/finalize',
  isEvaluatedGoalAndCriteria,
  async (req, res, next) => {
    try {
      const { id: performanceReviewId } = req.params;
      const evaluator = req.user;
      const form = await PerformanceReviewServices.finalizingSubmit(
        performanceReviewId,
        evaluator,
      );
      res.json({
        message: 'Submit final results successfully',
        form,
      });
    } catch (err) {
      next(err);
    }
  },
);

performanceReviewRouter.put(
  '/feedback/:id',
  saveFeedbackValidator,
  async (req, res, next) => {
    try {
      const { id: feedbackId } = req.params;
      const data = req.body;

      const feedback = await PerformanceReviewServices.saveFeedback(
        feedbackId,
        data,
      );

      res.json({
        message: 'Save feedback successfully',
        feedback,
      });
    } catch (err) {
      next(err);
    }
  },
);

export default performanceReviewRouter;

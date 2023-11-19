import express from 'express';
import StatusCodes from 'http-status-codes';

import {
  editGoalValidator,
  createGoalValidator,
} from 'api/middlewares/goalValidator';
import {
  isUser,
  isManager,
  isGoalOwnerOrSUM,
  isGoalSUM,
  isGoalOwner,
} from 'api/middlewares/permission';
import GoalServices from 'services/goal';

const goalRouter = express.Router();
goalRouter.use(isUser);

goalRouter.get('/', isManager, async (req, res, next) => {
  try {
    const goalList = await GoalServices.getAllGoal();
    res.json({
      message: 'Get goal list successfully',
      goalList,
    });
  } catch (err) {
    next(err);
  }
});

goalRouter.get('/manage', isManager, async (req, res, next) => {
  try {
    const managerId = req.user.id;
    const {
      filter = 'employee',
      search = '',
      limit = 10,
      page = 1,
    } = req.query;

    const goalList = await GoalServices.getManageGoalList({
      filter,
      search,
      managerId,
      limit,
      page,
    });

    res.json({
      message: 'Get managing goal list successfully',
      goalList,
    });
  } catch (err) {
    next(err);
  }
});

goalRouter.get('/status', async (req, res, next) => {
  try {
    const goalStatus = await GoalServices.getGoalStatus();
    res.json({
      message: 'Get goal status successfully',
      goalStatus,
    });
  } catch (err) {
    next(err);
  }
});

goalRouter.get('/:id', isGoalOwnerOrSUM, async (req, res, next) => {
  try {
    const { id } = req.params;
    const goal = await GoalServices.getGoalDetail(id);
    const goalStatus = goal.status.name;
    const goalOwner = goal.user;
    if (goalStatus === 'Drafting' && goalOwner.id !== req.user.id) {
      res
        .status(StatusCodes.FORBIDDEN)
        .send({ message: 'Permission Denied' });
      return;
    }

    res.json({
      message: 'Get goal detail successfully',
      goal,
    });
  } catch (err) {
    next(err);
  }
});

goalRouter.get(
  '/:id/discussion',
  isGoalOwnerOrSUM,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { limit, page, timestamp, messageId } = req.query;
      const discussion = await GoalServices.getGoalDiscussion({
        goalId: id,
        messageId,
        timestamp,
        limit,
        page,
      });
      res.json({
        message: 'Get goal discussion successfully',
        discussion,
      });
    } catch (err) {
      next(err);
    }
  },
);

goalRouter.post(
  '/:id/discussion',
  isGoalOwnerOrSUM,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { message } = req.body;

      const discussion = await GoalServices.addDiscussion({
        message,
        userId: req.user.id,
        goalId: id,
      });
      res.json({
        message: 'Add goal discussion successfully',
        discussion,
      });
    } catch (err) {
      next(err);
    }
  },
);

goalRouter.put(
  '/:id',
  editGoalValidator,
  isGoalOwnerOrSUM,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const goalInfo = req.body;

      const goal = await GoalServices.updateGoalDetail(goalInfo, id);

      res.json({
        message: 'Update goal detail successfully',
        goal,
      });
    } catch (err) {
      next(err);
    }
  },
);

goalRouter.put('/:id/approve', isGoalSUM, async (req, res, next) => {
  try {
    const { id } = req.params;

    const goal = await GoalServices.approveGoal(id);

    res.json({
      message: 'Approve goal successfully',
      goal,
    });
  } catch (err) {
    next(err);
  }
});

goalRouter.post('/', createGoalValidator, async (req, res, next) => {
  try {
    const goalData = req.body;
    const userId = req.user.id;
    const goal = await GoalServices.createGoal(goalData, userId);
    res.json({
      message: 'Create a new goal successfully',
      goal,
    });
  } catch (err) {
    next(err);
  }
});

goalRouter.delete('/:id', isGoalOwner, async (req, res, next) => {
  try {
    const goalId = req.params.id;
    const goal = await GoalServices.deleteOne(goalId);
    res.json({
      message: 'Delete goal successfully',
      goal,
    });
  } catch (err) {
    next(err);
  }
});

export default goalRouter;

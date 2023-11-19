import express from 'express';

import {
  isUser,
  isManager,
  isProfileOwnerOrManager,
} from 'api/middlewares/permission';
import {
  editProfileValidator,
  createProfileValidator,
} from 'api/middlewares/userValidator';
import GoalServices from 'services/goal';
import UserServices from 'services/user';

const userRouter = express.Router();

userRouter.use(isUser);

userRouter.get('/', async (req, res, next) => {
  try {
    const employeeList = await UserServices.getEmployeeList(
      req.query,
    );

    res.json({
      message: 'Get employee list successfully',
      employeeList,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.get('/auth', async (req, res) => {
  res.json(req.user);
});

userRouter.get('/editInfo', async (req, res, next) => {
  try {
    const info = await UserServices.getEditInfo();
    res.json({
      message: 'Get edit info successfully',
      info,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.get('/candidates', isManager, async (req, res, next) => {
  try {
    const candidateList = await UserServices.getCandidateList(
      req.query,
    );

    res.json({
      message: 'Get candidate list successfully',
      candidateList,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.get(
  '/:id',
  isProfileOwnerOrManager,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserServices.getProfile(id);
      res.json({
        message: 'Get user profile successfully',
        user,
      });
    } catch (err) {
      next(err);
    }
  },
);

userRouter.put(
  '/:id',
  isProfileOwnerOrManager,
  editProfileValidator,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userInfo = req.body;

      if (req.files?.avatar) userInfo.avatar = req.files.avatar;

      const user = await UserServices.updateUserProfile(userInfo, id);
      res.json({
        message: 'Update user info successfully',
        user,
      });
    } catch (err) {
      next(err);
    }
  },
);

userRouter.post(
  '/',
  isManager,
  createProfileValidator,
  async (req, res, next) => {
    try {
      const userData = req.body;

      if (req.files?.avatar) userData.avatar = req.files.avatar;

      const user = await UserServices.create(userData);

      res.json({
        message: 'Create user successfully',
        user,
      });
    } catch (err) {
      next(err);
    }
  },
);

userRouter.get(
  '/:id/goals',
  isProfileOwnerOrManager,
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const goalList = await GoalServices.getOwnerGoal(userId);
      res.json({
        message: 'Get goal list successfully',
        goalList,
      });
    } catch (err) {
      next(err);
    }
  },
);

export default userRouter;

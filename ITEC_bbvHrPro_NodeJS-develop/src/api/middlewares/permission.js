import StatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { User } from 'models';
import GoalServices from 'services/goal';
import UserServices from 'services/user';
import { ROLE } from 'utils/constant';

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: 'A token is required for authorization' });
    }

    const userData = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findOne({
      where: { id: userData.id, email: userData.email },
    });

    req.user = await UserServices.getProfile(user.id);

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid Credentials!' });
  }
};

const isManager = async (req, res, next) => {
  if (req.user?.role === ROLE.MANAGER) return next();

  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: 'Permission denied!' });
};

const isProfileOwnerOrManager = async (req, res, next) => {
  const isRoleManager = req.user?.role === ROLE.MANAGER;
  const isOwnerProfile = parseInt(req.params.id, 10) === req.user?.id;

  if (isRoleManager || isOwnerProfile) {
    return next();
  }

  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: 'Permission denied!' });
};

const isGoalOwnerOrSUM = async (req, res, next) => {
  const goal = await GoalServices.getGoalDetail(req.params.id);
  const isGoalOwner = goal.userId === req.user?.id;
  const isSUM = goal.user.directManager?.id === req.user?.id;

  if (isGoalOwner || isSUM) {
    return next();
  }

  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: 'Permission denied!' });
};

const isGoalSUM = async (req, res, next) => {
  const goal = await GoalServices.getGoalDetail(req.params.id);

  const isSUM = goal?.user?.directManager?.id === req.user?.id;

  if (isSUM) {
    return next();
  }

  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: 'Permission denied!' });
};

const isGoalOwner = async (req, res, next) => {
  const goal = await GoalServices.getGoalDetail(req.params.id);
  const isOwner = goal.userId === req.user?.id;

  if (isOwner) {
    return next();
  }

  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: 'Permission denied!' });
};
export {
  isUser,
  isManager,
  isProfileOwnerOrManager,
  isGoalOwnerOrSUM,
  isGoalSUM,
  isGoalOwner,
};

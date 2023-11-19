import { Op } from 'sequelize';

import { User, Goal, GoalStatus, GoalDiscussion } from 'models';
import { DISCUSSION_LIMIT, USER_ATTRIBUTES } from 'utils/constant';
import { searchByFullName } from 'utils/function';

const getManageGoalList = async ({
  filter = 'employee',
  search = '',
  managerId,
  limit = 10,
  page = 1,
}) => {
  const offset = (page - 1) * limit;
  const queryToken = `%${search}%`;

  const include = [];

  let filterQuery;
  switch (filter) {
    case 'status':
      include.push({
        model: GoalStatus,
        attributes: ['id', 'name'],
        as: 'status',
        where: { name: { [Op.iLike]: queryToken } },
      });
      break;

    case 'title':
      filterQuery = { title: { [Op.iLike]: queryToken } };
      break;

    case 'employee':
      include.push({
        model: User,
        attributes: [...USER_ATTRIBUTES, 'manager'],
        as: 'user',
        where: {
          [Op.and]: [
            { manager: managerId },
            searchByFullName(queryToken, 'user'),
          ],
        },
      });
      break;
    default:
  }

  const filterGoal = await Goal.findAll({
    where: filterQuery,
    include,
    order: [['id', 'DESC']],
  });

  const goalIdArr = filterGoal.map((goal) => goal.id);

  const goalList = await Goal.findAndCountAll({
    where: { id: { [Op.in]: goalIdArr } },
    include: [
      {
        model: User,
        attributes: [...USER_ATTRIBUTES, 'manager'],
        as: 'user',
        where: { manager: managerId },
        include: [
          {
            model: User,
            attributes: USER_ATTRIBUTES,
            as: 'directManager',
          },
        ],
      },
      {
        model: GoalStatus,
        attributes: ['id', 'name'],
        as: 'status',
        where: { name: { [Op.not]: 'Drafting' } },
      },
    ],
    order: [
      ['status', 'id'],
      ['user', 'id'],
      ['updatedAt', 'DESC'],
    ],
    distinct: true,
    col: 'id',
    offset,
    limit,
  });
  return goalList;
};

const getOwnerGoal = async (ownerId) => {
  const goalList = await Goal.findAll({
    where: { userId: ownerId },
    include: [
      {
        model: User,
        attributes: [...USER_ATTRIBUTES, 'manager'],
        as: 'user',
        include: [
          {
            model: User,
            attributes: USER_ATTRIBUTES,
            as: 'directManager',
          },
        ],
      },
      {
        model: GoalStatus,
        attributes: ['id', 'name'],
        as: 'status',
      },
    ],
    order: [
      ['status', 'id'],
      ['user', 'id'],
      ['updatedAt', 'DESC'],
    ],
  });
  return goalList;
};

const getAllGoal = async () => {
  const goalList = await Goal.findAll({
    include: [
      {
        model: User,
        attributes: [...USER_ATTRIBUTES, 'manager'],
        as: 'user',
        include: [
          {
            model: User,
            attributes: USER_ATTRIBUTES,
            as: 'directManager',
          },
        ],
      },
      {
        model: GoalStatus,
        attributes: ['id', 'name'],
        as: 'status',
      },
    ],
    order: [
      ['status', 'id'],
      ['user', 'id'],
      ['updatedAt', 'DESC'],
    ],
  });
  return goalList;
};

const getGoalDiscussion = async ({
  goalId,
  messageId,
  timestamp = new Date().toJSON(),
  limit = DISCUSSION_LIMIT,
  page = 1,
}) => {
  const offset = (page - 1) * limit;
  const discussion = await GoalDiscussion.findAndCountAll({
    where: {
      goalId,
      [Op.or]: {
        createdAt: { [Op.lt]: timestamp },
        id: { [Op.lt]: messageId },
      },
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: USER_ATTRIBUTES,
      },
    ],
    order: [
      ['createdAt', 'desc'],
      ['id', 'desc'],
    ],
    limit,
    offset,
  });
  return discussion;
};

const getGoalDetail = async (goalId) => {
  const goal = await Goal.findOne({
    where: { id: goalId },
    include: [
      {
        model: User,
        as: 'user',
        include: [
          {
            model: User,
            attributes: USER_ATTRIBUTES,
            as: 'directManager',
          },
        ],
      },
      {
        model: GoalStatus,
        attributes: ['id', 'name'],
        as: 'status',
      },
    ],
  });

  goal.dataValues.discussion = await getGoalDiscussion({
    goalId: goal.id,
  });

  return goal;
};

const updateGoalDetail = async (goalInfo, goalId) => {
  if (goalInfo.startDate === '') goalInfo.startDate = null;
  if (goalInfo.endDate === '') goalInfo.endDate = null;

  await Goal.update(goalInfo, {
    where: {
      id: goalId,
    },
  });

  const goal = await getGoalDetail(goalId);
  return goal;
};

const approveGoal = async (goalId) => {
  const approvedStatus = await GoalStatus.findOne({
    where: { name: 'Approved' },
  });

  await Goal.update(
    { statusId: approvedStatus.id },
    { where: { id: goalId } },
  );

  const goal = await getGoalDetail(goalId);

  return goal;
};

const createGoal = async (goalData, userId) => {
  goalData.userId = userId;

  if (goalData.startDate === '') goalData.startDate = null;
  if (goalData.endDate === '') goalData.endDate = null;

  if (!goalData?.statusId) {
    const pending = await GoalStatus.findOne({
      name: 'Pending Approval',
    });

    goalData.statusId = pending.id;
  }

  const goal = await Goal.create(goalData);

  const goalDetails = await getGoalDetail(goal.id);

  return goalDetails;
};

const getGoalStatus = async () => {
  const status = await GoalStatus.findAll();

  return status;
};

const deleteOne = async (goalId) => {
  const goal = await Goal.findByPk(goalId);
  await goal.destroy();
  return goal;
};

const addDiscussion = async (discussionData) => {
  await GoalDiscussion.create(discussionData);

  const discussion = await getGoalDiscussion({
    goalId: discussionData.goalId,
    limit: 1,
  });
  return discussion;
};

const GoalServices = {
  getAllGoal,
  getOwnerGoal,
  getManageGoalList,
  createGoal,
  approveGoal,
  updateGoalDetail,
  getGoalDetail,
  getGoalStatus,
  deleteOne,
  getGoalDiscussion,
  addDiscussion,
};
export default GoalServices;

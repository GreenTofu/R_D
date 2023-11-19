import { omit } from 'lodash';
import { Op } from 'sequelize';

import {
  User,
  Tag,
  Project,
  ProjectMember,
  ProjectStatus,
} from 'models';
import { uploadImage } from 'services/image';
import { USER_ATTRIBUTES } from 'utils/constant';
import { searchByFullName } from 'utils/function';

const getUserList = async ({
  where,
  search = '',
  limit,
  filter,
  offset,
}) => {
  const queryToken = `%${search}%`;

  let filterQuery;
  switch (filter) {
    case 'tags':
    case 'manager':
      filterQuery = true;
      break;
    case 'position':
    case 'role':
    case 'email':
      filterQuery = {
        [filter]: {
          [Op.iLike]: queryToken,
        },
      };
      break;
    case 'name':
    default:
      filterQuery = searchByFullName(queryToken, 'User');
      break;
  }
  const filterUser = await User.findAll({
    where: {
      [Op.and]: [where, search && filterQuery],
    },
    include: [
      {
        attributes: ['id', 'name'],
        model: Tag,
        where: filter === 'tags' && {
          name: {
            [Op.iLike]: queryToken,
          },
        },
        as: 'tags',
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        attributes: USER_ATTRIBUTES,
        as: 'directManager',
        where:
          filter === 'manager' &&
          searchByFullName(queryToken, 'directManager'),
      },
    ],
    order: [['id', 'DESC']],
  });

  const userIdArr = filterUser.map((user) => user.id);

  const result = await User.findAndCountAll({
    where: { id: { [Op.in]: userIdArr } },
    include: [
      {
        attributes: ['id', 'name'],
        model: Tag,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        attributes: USER_ATTRIBUTES,
        as: 'directManager',
      },
      {
        attributes: ['id'],
        model: Project,
        as: 'projects',
        through: { as: 'working', attributes: ['effort'] },
        include: [{ model: ProjectStatus, as: 'projectStatus' }],
      },
    ],
    order: [['id', 'DESC']],
    distinct: true,
    col: 'id',
    offset,
    limit,
  });

  return result;
};

const getEmployeeList = async (query) => {
  const { page = 1, limit = 10, search } = query;
  const offset = (page - 1) * limit;

  const filter = query.filter || 'name';

  const where = {
    [Op.not]: { role: 'Candidate' },
  };

  const userList = await getUserList({
    where,
    search,
    limit,
    filter,
    offset,
  });

  return userList;
};

const getCandidateList = async (query) => {
  const { page = 1, limit = 10, search } = query;
  const offset = (page - 1) * limit;

  const filter = query.filter || 'name';

  const where = {
    [Op.and]: [{ role: 'Candidate' }],
  };

  const candidateList = await getUserList({
    where,
    search,
    limit,
    filter,
    offset,
  });

  return candidateList;
};

const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
      },
      {
        model: Project,
        as: 'projects',
        attributes: ['id', 'logo', 'name'],
        through: {
          model: ProjectMember,
          as: 'working',
          attributes: ['effort'],
        },
        include: [
          {
            model: ProjectStatus,
            as: 'projectStatus',
            where: { statusName: 'In progress' },
          },
        ],
      },
      {
        model: User,
        attributes: USER_ATTRIBUTES,
        as: 'directManager',
      },
    ],
  });

  return user;
};

const getEditInfo = async () => {
  const managers = await User.findAll({
    where: { role: 'Manager' },
    attributes: USER_ATTRIBUTES,
  });

  const positions = [
    'Project Manager',
    'Designer',
    'Software Engineer',
    'Human Resources',
    'Service Unit Manager',
  ];

  const roles = ['Manager', 'Employee', 'Candidate'];

  return {
    managers,
    positions,
    roles,
  };
};

const updateUserProfile = async (userInfo, userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (userInfo?.avatar) {
    userInfo.avatar = await uploadImage(userInfo.avatar, user.avatar);
  }
  const newAttributes = omit(userInfo);

  await user.update(newAttributes);

  await user.save();

  const userProfile = await getProfile(user.id);

  return userProfile;
};

const create = async (data) => {
  const newAttributes = omit(data, 'avatar');

  const user = await User.create(newAttributes);

  if (data?.avatar) {
    user.avatar = await uploadImage(data.avatar, user.avatar);
    await user.save();
  }

  const userProfile = await getProfile(user.id);

  return userProfile;
};

const UserServices = {
  getEmployeeList,
  getCandidateList,
  getProfile,
  getEditInfo,
  updateUserProfile,
  create,
};

export default UserServices;

import { parseInt } from 'lodash';
import { Op } from 'sequelize';

import { User, Tag, Project, ProjectStatus } from 'models';
import { getPercentage } from 'utils/function';

const getAvailableList = async (page = 1, limit = 3) => {
  const users = await User.findAll({
    attributes: [
      'id',
      'avatar',
      'firstName',
      'lastName',
      'availability',
    ],
    include: [
      {
        attributes: ['id', 'name'],
        model: Tag,
        as: 'tags',
        through: { attributes: [] },
      },
      {
        attributes: ['id'],
        model: Project,
        as: 'projects',
        through: { as: 'working', attributes: ['effort'] },
        include: [{ model: ProjectStatus, as: 'projectStatus' }],
      },
    ],
    order: [['id', 'ASC']],
  });

  const availableUsers = users.filter(
    (user) => user.availability > 0,
  );

  const offset = (page - 1) * limit;

  const totalAvailable = availableUsers.length;

  // Sort decending by availability
  availableUsers.sort((a, b) => b.availability - a.availability);

  return {
    rows: availableUsers.slice(offset, offset + parseInt(limit)),
    count: totalAvailable,
  };
};

const getUpcoming = async (page = 1, limit = 6) => {
  const users = await User.findAndCountAll({
    attributes: ['id', 'avatar', 'firstName', 'lastName', 'position'],
    limit,
    offset: (page - 1) * limit,
  });

  return users;
};

const getStatistic = async () => {
  const statisticData = {};

  const firstDateOfMonth = new Date();
  firstDateOfMonth.setDate(1);
  firstDateOfMonth.setHours(0, 0, 0, 0);

  // Total employee statistics
  const totalUsers = await User.count({
    where: { role: { [Op.not]: 'Candidate' } },
  });

  const oldUsers = await User.count({
    where: {
      role: { [Op.not]: 'Candidate' },
      startingDate: { [Op.lt]: firstDateOfMonth },
    },
  });

  const newUsers = totalUsers - oldUsers;

  statisticData.totalEmployees = {
    total: totalUsers,
    percentage: getPercentage(newUsers, oldUsers),
  };

  // Total candidate statistics
  const totalCandidates = await User.count({
    where: { role: 'Candidate' },
  });

  const oldCandidates = await User.count({
    where: {
      role: 'Candidate',
      startingDate: { [Op.lt]: firstDateOfMonth },
    },
  });

  const newCandidates = totalCandidates - oldCandidates;

  statisticData.totalCandidates = {
    total: totalCandidates,
    percentage: getPercentage(newCandidates, oldCandidates),
  };

  // Total project statistics
  const totalProjects = await Project.count();

  const oldProjects = await Project.count({
    where: {
      createdAt: { [Op.lt]: firstDateOfMonth },
    },
  });

  const newProjects = totalProjects - oldProjects;

  statisticData.totalProjects = {
    total: totalProjects,
    percentage: getPercentage(newProjects, oldProjects),
  };

  // Active project statistics
  const totalActives = await Project.count({
    include: [
      {
        model: ProjectStatus,
        as: 'projectStatus',
        where: { statusName: 'In progress' },
      },
    ],
  });

  const oldActives = await Project.count({
    include: [
      {
        model: ProjectStatus,
        as: 'projectStatus',
        where: { statusName: 'In progress' },
      },
    ],
    where: {
      updatedAt: { [Op.lt]: firstDateOfMonth },
    },
  });

  const newActives = totalActives - oldActives;

  statisticData.activeProjects = {
    total: totalActives,
    percentage: getPercentage(newActives, oldActives),
  };

  return statisticData;
};

const ResourceServices = {
  getAvailableList,
  getUpcoming,
  getStatistic,
};

export default ResourceServices;

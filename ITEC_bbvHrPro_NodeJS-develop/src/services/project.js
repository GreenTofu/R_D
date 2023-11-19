import { omit } from 'lodash';
import { Op } from 'sequelize';

import {
  Project,
  User,
  ProjectStatus,
  Tag,
  ProjectMember,
} from 'models';
import { USER_ATTRIBUTES } from 'utils/constant';
import { searchByFullName } from 'utils/function';

const getList = async (query = {}) => {
  const { page = 1, limit = 10, search = '' } = query;
  const offset = (page - 1) * limit;

  const queryTokens = `%${search}%`;

  const filter = query.filter || 'name';

  const projectWithFilter = await Project.findAll({
    where: filter === 'name' && {
      name: {
        [Op.iLike]: queryTokens,
      },
    },
    include: [
      {
        model: User,
        as: 'projectManager',
        where:
          filter === 'projectManager' &&
          searchByFullName(queryTokens, 'projectManager'),
        attributes: USER_ATTRIBUTES,
      },
      {
        model: User,
        as: 'members',
        where:
          filter === 'members' &&
          searchByFullName(queryTokens, 'members'),
        attributes: USER_ATTRIBUTES,
        through: { attributes: [] },
      },
      {
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        where: filter === 'tags' && {
          name: {
            [Op.iLike]: queryTokens,
          },
        },
        through: { attributes: [] },
      },
      {
        model: ProjectStatus,
        as: 'projectStatus',
        where: filter === 'projectStatus' && {
          statusName: {
            [Op.iLike]: queryTokens,
          },
        },
      },
    ],
    order: [['id', 'DESC']],
  });

  const projectIdArr = projectWithFilter.map((project) => project.id);

  const result = await Project.findAndCountAll({
    where: { id: { [Op.in]: projectIdArr } },
    include: [
      {
        model: User,
        as: 'projectManager',
        attributes: USER_ATTRIBUTES,
      },
      {
        model: User,
        as: 'members',
        attributes: USER_ATTRIBUTES,
        through: { attributes: [] },
      },
      {
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
      {
        model: ProjectStatus,
        as: 'projectStatus',
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

const getProjectDetail = async (projectId) => {
  const projectInfo = await Project.findByPk(projectId, {
    include: [
      {
        model: User,
        as: 'projectManager',
        attributes: USER_ATTRIBUTES,
      },
      {
        model: User,
        as: 'members',
        attributes: [
          'id',
          'firstName',
          'lastName',
          'avatar',
          'position',
        ],
        through: {
          as: 'working',
          attributes: [
            'effort',
            'startDate',
            'endDate',
            'estimateTime',
            'actualTime',
          ],
        },
      },
      {
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
      {
        model: ProjectStatus,
        as: 'projectStatus',
      },
    ],
  });
  return projectInfo;
};

const getStatusList = async () => {
  const status = await ProjectStatus.findAll();
  return status;
};

const getTags = async (data) => {
  const result = [];
  data.forEach((tag) => {
    result.push(
      Tag.findOrCreate({
        where: { name: tag },
        defaults: {
          description: 'This is description',
        },
      }),
    );
  });
  await Promise.all(result);
  const tagList = await Tag.findAll({
    where: { name: { [Op.in]: data } },
  });

  return tagList;
};

const createProject = async (projectData) => {
  const data = omit(projectData, 'tags');
  const project = await Project.create(data);
  if (projectData.tags) {
    const tagList = await getTags(projectData.tags);

    await project.addTags(tagList);
  }
  const projectDetails = await getProjectDetail(project.id);

  return projectDetails;
};

const updateProjectDetail = async (projectInfo, projectId) => {
  const project = await Project.findOne({ where: { id: projectId } });

  if (projectInfo.tags) {
    const tagList = await getTags(projectInfo.tags);
    project.setTags(tagList);
  }
  if (projectInfo.members) {
    const memberList = projectInfo.members.map((member) => member.id);
    const members = await User.findAll({
      where: { id: { [Op.in]: memberList } },
    });
    await project.setMembers(members);

    const promises = [];
    projectInfo.members.forEach((member) => {
      const workingMember = ProjectMember.update(omit(member, 'id'), {
        where: {
          projectId: project.id,
          employeeId: member.id,
        },
      });

      promises.push(workingMember);
    });
    await Promise.all(promises);
  }

  const newAttributes = omit(projectInfo, ['tags', 'members']);

  await project.update(newAttributes);
  await project.save();

  return project;
};

const ProjectServices = {
  getList,
  createProject,
  getProjectDetail,
  updateProjectDetail,
  getStatusList,
};

export default ProjectServices;

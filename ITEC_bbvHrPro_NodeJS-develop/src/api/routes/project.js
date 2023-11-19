import express from 'express';

import { isManager, isUser } from 'api/middlewares/permission';
import {
  createProjectValidator,
  editProjectValidator,
} from 'api/middlewares/projectValidator';
import ProjectServices from 'services/project';

const projectRouter = express.Router();

projectRouter.use(isUser);

projectRouter.get('/', async (req, res, next) => {
  try {
    const projectList = await ProjectServices.getList(req.query);
    res.json({
      message: 'Get project list successfully',
      projectList,
    });
  } catch (err) {
    next(err);
  }
});

projectRouter.get('/status', async (req, res, next) => {
  try {
    const status = await ProjectServices.getStatusList();
    res.json({
      message: 'Get status list successfully',
      status,
    });
  } catch (err) {
    next(err);
  }
});

projectRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await ProjectServices.getProjectDetail(id);
    res.json({
      message: 'Get project detail successfully',
      project,
    });
  } catch (err) {
    next(err);
  }
});

projectRouter.put(
  '/:id',
  editProjectValidator,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const projectInfo = req.body;
      const projectDetail = await ProjectServices.updateProjectDetail(
        projectInfo,
        id,
      );
      res.json({
        message: 'Update  project detail successfully',
        projectDetail,
      });
    } catch (err) {
      next(err);
    }
  },
);

projectRouter.post(
  '/',
  isManager,
  createProjectValidator,
  async (req, res, next) => {
    try {
      const projectData = req.body;
      const project = await ProjectServices.createProject(
        projectData,
      );
      res.json({
        message: 'Create project successfully',
        project,
      });
    } catch (err) {
      next(err);
    }
  },
);
export default projectRouter;

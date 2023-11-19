import express from 'express';

import { isUser, isManager } from 'api/middlewares/permission';
import ResourceServices from 'services/resource';

const resourceRouter = express.Router();

resourceRouter.use(isUser, isManager);

resourceRouter.get('/available', async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const resources = await ResourceServices.getAvailableList(
      page,
      limit,
    );

    res.json({
      message: 'Get resource available successfully',
      resources,
    });
  } catch (err) {
    next(err);
  }
});

resourceRouter.get('/upcoming', async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const resources = await ResourceServices.getUpcoming(page, limit);
    res.json({
      message: 'Get resource upcoming successfully',
      resources,
    });
  } catch (err) {
    next(err);
  }
});

resourceRouter.get('/statistic', async (req, res, next) => {
  try {
    const result = await ResourceServices.getStatistic();
    res.json({
      message: 'Get resource statistic successfully',
      result,
    });
  } catch (err) {
    next(err);
  }
});

export default resourceRouter;

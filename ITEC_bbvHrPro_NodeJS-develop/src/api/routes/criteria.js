import express from 'express';

import { isUser } from 'api/middlewares/permission';
import CriteriaService from 'services/criteria';

const criteriaRouter = express.Router();

criteriaRouter.use(isUser);

criteriaRouter.get('/', async (req, res, next) => {
  try {
    const criteriaList = await CriteriaService.getCriteriaList();
    res.json({
      message: 'Get criteria list successfully',
      criteriaList,
    });
  } catch (err) {
    next(err);
  }
});

export default criteriaRouter;

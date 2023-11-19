import { celebrate, Joi, Segments } from 'celebrate';

const editGoalValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string().allow('').allow(null),
    statusId: Joi.number(),
    startDate: Joi.date().allow('').allow(null),
    endDate: Joi.date().allow('').allow(null),
  }),
});

const createGoalValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow('').allow(null),
    statusId: Joi.number(),
    startDate: Joi.date().allow('').allow(null),
    endDate: Joi.date().allow('').allow(null),
  }),
});

export { createGoalValidator, editGoalValidator };

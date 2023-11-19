import { celebrate, Joi, Segments } from 'celebrate';

const createProjectValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    startDate: Joi.date(),
    endDate: Joi.date(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.number(),
  }),
});

const editProjectValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string().allow('').allow(null),
    startDate: Joi.date(),
    endDate: Joi.date(),
    tags: Joi.array().items(Joi.string()),
    manager: Joi.number(),
    members: Joi.array().items(
      Joi.object().keys({
        id: Joi.number().required(),
        effort: Joi.number(),
        startDate: Joi.date().allow(null).empty(''),
        endDate: Joi.date().allow(null).empty(''),
        estimateTime: Joi.number().allow(null).empty(''),
        actualTime: Joi.number().allow(null).empty(''),
      }),
    ),
    status: Joi.number(),
  }),
});

export { createProjectValidator, editProjectValidator };

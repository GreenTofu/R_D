import { celebrate, Joi, Segments } from 'celebrate';

const editProfileValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    position: Joi.string(),
    role: Joi.string(),
    startingDate: Joi.date(),
    manager: Joi.number(),
  }),
});

const createProfileValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    position: Joi.string().required(),
    role: Joi.string().required(),
    startingDate: Joi.date(),
    manager: Joi.number(),
  }),
});

export { editProfileValidator, createProfileValidator };

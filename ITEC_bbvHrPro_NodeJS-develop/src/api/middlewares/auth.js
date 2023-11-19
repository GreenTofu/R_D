import { celebrate, Joi, Segments } from 'celebrate';

const signUpValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phone: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().default('Employee'),
    position: Joi.string().required(),
    startingDate: Joi.date(),
  }),
});

const signInValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export { signUpValidator, signInValidator };

import { isCelebrateError } from 'celebrate';
import { StatusCodes } from 'http-status-codes';
import {
  DatabaseError,
  ConnectionError,
  ValidationError,
  AggregateError,
} from 'sequelize';

import ErrorWithStatusCode from 'utils/errors';

const errorHandler = (err, req, res, next) => {
  if (err instanceof DatabaseError) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  if (err instanceof ConnectionError) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: err.errors[0].message,
      field: err.errors[0].path,
    });
  }

  if (err instanceof ErrorWithStatusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (isCelebrateError(err)) {
    const { details } = err;

    let error;

    details.forEach((joiError) => {
      const validateErr = joiError.details[0];

      error = {
        message: validateErr.message,
        field: validateErr.path[0],
      };
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ ...error });
  }

  if (err instanceof AggregateError) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: err.errors[0].message });
  }

  return next(err);
};

export default errorHandler;

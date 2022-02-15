import ApiError from '../errors/ApiError.js';

const dbErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      err = ApiError.BadRequest(err.errors.map(({ message }) => message).join('; '));
      break;

    case 'SequelizeForeignKeyConstraintError':
    case 'ValidationError':
    case 'CastError':
      err = ApiError.BadRequest(err.message);
      break;
  }

  next(err);
};

export default dbErrorMiddleware;

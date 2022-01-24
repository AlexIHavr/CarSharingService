import ApiError from '../errors/ApiError.js';

const sqlErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      err = ApiError.BadRequest(err.errors.map(({ message }) => message).join('; '));
      break;

    case 'SequelizeForeignKeyConstraintError':
      err = ApiError.BadRequest(`Id of ${err.fields[0]} does not exist.`);
      break;
  }

  next(err);
};

export default sqlErrorMiddleware;

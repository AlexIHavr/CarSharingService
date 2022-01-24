import ApiError from '../errors/ApiError.js';

const validationMiddleware = (fieldSchemas) => {
  return function (req, res, next) {
    let errors = [];

    fieldSchemas.forEach(({ field, schema }) => {
      const error = schema.validate({ [field]: req.body[field] }).error;

      if (error) errors.push(error.message);
    });

    if (errors.length) {
      return next(ApiError.BadRequest(errors.join('; ')));
    }

    next();
  };
};

export default validationMiddleware;

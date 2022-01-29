import ApiError from '../errors/ApiError.js';

const validationMiddleware = (schema) => {
  return function (req, res, next) {
    const { error } = schema.validate(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      return next(ApiError.BadRequest(error.message));
    }

    next();
  };
};

export default validationMiddleware;

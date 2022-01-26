import ApiError from '../errors/ApiError.js';

const validationMiddleware = (schema) => {
  return function (req, res, next) {
    const schemaKeys = Array.from(schema._ids._byKey.keys());

    const reqFields = schemaKeys.reduce((obj, field) => {
      obj[field] = req.body[field];
      return obj;
    }, {});

    const { error } = schema.validate(reqFields);

    if (error) {
      return next(ApiError.BadRequest(error.message));
    }

    next();
  };
};

export default validationMiddleware;

import ApiError from '../errors/ApiError.js';

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (!(err instanceof ApiError)) {
    err.code = 500;
  }

  res.status(err.code).json({ code: err.code, message: err.message });
};

export default errorMiddleware;

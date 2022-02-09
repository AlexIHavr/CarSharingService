import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const accessTokenMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return next(ApiError.Forbidden('No access, user is not log in.'));
  }

  const bearerToken = req.headers.authorization.split(' ');
  let accessToken = '';

  if (bearerToken[0] === 'Bearer') {
    accessToken = bearerToken[1];
  } else {
    return next(ApiError.Forbidden('No access, check out bearer access token.'));
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    req.roles = payload.roles;
    next();
  } catch (e) {
    next(ApiError.Forbidden('No access, invalid access token'));
  }
};

export default accessTokenMiddleware;

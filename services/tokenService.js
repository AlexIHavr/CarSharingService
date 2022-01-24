import jwt from 'jsonwebtoken';

class TokenService {
  generateAccessToken(roles) {
    return jwt.sign({ roles }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.TIME_JWT_ACCESS,
    });
  }
}

export default new TokenService();

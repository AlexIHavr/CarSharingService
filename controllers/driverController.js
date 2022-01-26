import { USER } from '../constants/roles.js';
import driverService from '../services/driverService.js';
import tokenService from '../services/tokenService.js';

class DriverController {
  async add(req, res, next) {
    try {
      const newDriver = await driverService.add(req.body);
      const accessToken = tokenService.generateAccessToken([USER]);

      res.json({ newDriver, accessToken });
    } catch (err) {
      next(err);
    }
  }
}

export default new DriverController();

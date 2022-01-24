import { USER } from '../roles/roles.js';
import driverService from '../services/driverService.js';
import tokenService from '../services/tokenService.js';

class DriverController {
  async addDriver(req, res, next) {
    try {
      const newDriver = await driverService.addDriver(req.body);
      const accessToken = tokenService.generateAccessToken([USER]);

      res.json({ newDriver, accessToken });
    } catch (err) {
      next(err);
    }
  }
}

export default new DriverController();

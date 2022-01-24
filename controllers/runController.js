import runService from '../services/runService.js';

class RunController {
  async addRun(req, res, next) {
    try {
      const newRun = await runService.addRun(req.body);
      res.json(newRun);
    } catch (err) {
      next(err);
    }
  }
}

export default new RunController();

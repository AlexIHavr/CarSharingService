import runService from '../services/runService.js';

class RunController {
  async add(req, res, next) {
    try {
      const newRun = await runService.add(req.body);
      res.json(newRun);
    } catch (err) {
      next(err);
    }
  }
}

export default new RunController();

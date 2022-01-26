import carService from '../services/carService.js';

class CarController {
  async getCarsByFilter(req, res, next) {
    try {
      const cars = await carService.getCarsByFilter(req.body.filter);
      res.json(cars);
    } catch (err) {
      next(err);
    }
  }

  async getReservedUnpaid(req, res, next) {
    try {
      const reservedUnpaidCars = await carService.getReservedUnpaid();

      res.json(reservedUnpaidCars);
    } catch (err) {
      next(err);
    }
  }

  async add(req, res, next) {
    try {
      const newCar = await carService.add(req.body);
      res.json(newCar);
    } catch (err) {
      next(err);
    }
  }

  async setStatus(req, res, next) {
    try {
      const cars = await carService.setStatus(req.body);

      res.json(cars);
    } catch (err) {
      next(err);
    }
  }

  async setCoordinates(req, res, next) {
    try {
      const updatedCars = await carService.setCoordinates(req.body);

      res.json(updatedCars);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const car = await carService.remove(req.body.filter);

      res.json(car);
    } catch (err) {
      next(err);
    }
  }
}

export default new CarController();

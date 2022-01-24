import carService from '../services/carService.js';

class CarController {
  async getUsingFewFuelCars(req, res, next) {
    try {
      const cars = await carService.getUsingFewFuelCars();
      res.json(cars);
    } catch (err) {
      next(err);
    }
  }

  async getReservedUnpaidCars(req, res, next) {
    try {
      const reservedUnpaidCars = await carService.getReservedUnpaidCars();

      res.json(reservedUnpaidCars);
    } catch (err) {
      next(err);
    }
  }

  async addCar(req, res, next) {
    try {
      const newCar = await carService.addCar(req.body);
      res.json(newCar);
    } catch (err) {
      next(err);
    }
  }

  async setInUseCar(req, res, next) {
    try {
      const car = await carService.setInUseCar(req.body.carId);
      res.json(car);
    } catch (err) {
      next(err);
    }
  }

  async setInServiceCar(req, res, next) {
    try {
      const oldCars = await carService.setInServiceCar();

      res.json(oldCars);
    } catch (err) {
      next(err);
    }
  }

  async setCoordinatesCar(req, res, next) {
    try {
      const updatedCars = await carService.setCoordinatesCar();

      res.json(updatedCars);
    } catch (err) {
      next(err);
    }
  }

  async removeCar(req, res, next) {
    try {
      const car = await carService.removeCar(req.body.VIN);

      res.json(car);
    } catch (err) {
      next(err);
    }
  }
}

export default new CarController();

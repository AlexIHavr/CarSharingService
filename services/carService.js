import { FREE, IN_SERVICE, IN_USE, RESERVED, UNAVAILABLE } from '../constants/statuses.js';
import ApiError from '../errors/ApiError.js';
import carModel from '../models/carModel.js';
import driverModel from '../models/driverModel.js';
import runModel from '../models/runModel.js';
import driverService from './driverService.js';
import filterService from './filterService.js';

class CarService {
  async add(data) {
    const newCar = await carModel.create(data);
    return newCar;
  }

  async setStatus({ status, filter }) {
    const parsedFilter = filterService.parseFilter(filter);

    let cars = await carModel.findAll(parsedFilter);

    for (let car of cars) {
      switch (status) {
        case FREE:
        case UNAVAILABLE:
        case RESERVED:
        case IN_SERVICE:
          if (car.status === IN_USE) {
            throw new ApiError.BadRequest('Car is using now.');
          }

          await car.update({ status });
          break;
        case IN_USE:
          car = await this.setInUseStatus(car);
          break;
      }
    }

    return cars;
  }

  async setInUseStatus(car) {
    const run = await runModel.findByPk(car.currentRun);

    const driverCreditCard = await driverService.getDriverCreditCard(run?.driver);

    if (!driverCreditCard) {
      throw ApiError.BadRequest('Driver credit card has not been authorized.');
    }

    await car.update({ status: IN_USE });

    return car;
  }

  async getCarsByFilter(filter) {
    const cars = await carModel.findAll({
      where: filterService.parseFilter(filter),
    });

    return cars;
  }

  async getReservedUnpaid() {
    const reservedCars = await carModel.findAll({
      where: { status: 'reserved' },
    });

    const reservedUnpaidCars = [];

    for (const car of reservedCars) {
      const currentRun = await runModel.findByPk(car.currentRun);
      const driver = await driverModel.findByPk(currentRun.driver);

      if (!driver.creditCard)
        reservedUnpaidCars.push({
          VIN: car.VIN,
          geoLatitude: car.geoLatitude,
          geoLongitude: car.geoLongitude,
          driverFirstName: driver.firstName,
          driverLastName: driver.lastName,
          driverLicenseNumber: driver.licenseNumber,
        });
    }

    return reservedUnpaidCars;
  }

  async setCoordinates({ filter, latitude, longitude }) {
    let cars = await carModel.findAll({
      where: filterService.parseFilter(filter),
    });

    for (let car of cars) {
      car.geoLatitude = latitude;
      car.geoLongitude = longitude;

      await car.save();
    }

    return cars;
  }

  async setCarCurrentRun(carId, currentRunId) {
    await carModel.update({ currentRun: currentRunId, status: RESERVED }, { where: { id: carId } });
  }

  async removeCurrentRun(carId) {
    await carModel.update({ currentRun: null, status: FREE }, { where: { id: carId } });
  }

  async remove(filter) {
    const cars = await carModel.findAll(filter);

    for (let car of cars) {
      await car.destroy();
    }

    return cars;
  }
}

export default new CarService();

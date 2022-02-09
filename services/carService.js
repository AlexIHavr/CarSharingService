import { FREE, IN_USE, RESERVED } from '../constants/statuses.js';
import ApiError from '../errors/ApiError.js';
import carModel from '../models/carModel.js';
import filterService from './filterService.js';

class CarService {
  async add(data) {
    const newCar = await carModel.create(data);
    return newCar;
  }

  async setStatus({ status, filter }) {
    let cars = await carModel.findAll({ where: filterService.parseFilter(filter) });

    for (let car of cars) {
      if (car.status === IN_USE) {
        throw ApiError.BadRequest('Car is using now.');
      }

      if (status === IN_USE) {
        const currentRun = await car.getRun();
        if (!currentRun) {
          throw ApiError.BadRequest(`Car with id '${car.id}' has not current run.`);
        }

        const driver = await currentRun.getDriver();
        if (!driver.creditCard) {
          throw ApiError.BadRequest(
            `Credit card of driver with id '${driver.id}' has not been authorized.`
          );
        }
      }

      await car.update({ status });
    }

    return cars;
  }

  async getCarsByFilter(filter) {
    const cars = await carModel.findAll({
      where: filterService.parseFilter(filter),
    });

    return cars;
  }

  async getReservedUnpaid() {
    const reservedCars = await carModel.findAll({
      where: { status: RESERVED },
    });

    const reservedUnpaidCars = [];

    for (const car of reservedCars) {
      const currentRun = await car.getRun();
      const driver = await currentRun.getDriver();

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

  async remove(filter) {
    const cars = await carModel.findAll({ where: filterService.parseFilter(filter) });

    for (let car of cars) {
      const currentRun = await car.getRun();

      if (currentRun) {
        throw ApiError.BadRequest(
          `You try to remove car with id '${car.id}', which have the current run '${currentRun.id}'.`
        );
      }
      await car.destroy();
    }

    return cars;
  }
}

export default new CarService();

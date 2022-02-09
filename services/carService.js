import dbRepository from '../repositories/index.js';
import { IN_USE, RESERVED } from '../constants/statuses.js';
import ApiError from '../errors/ApiError.js';
import modelRepository from '../repositories/modelRepository.js';
import filterService from './filterService.js';

class CarService {
  async add(data) {
    const newCar = await dbRepository.create(modelRepository.carModel, data);
    return newCar;
  }

  async setStatus({ status, filter }) {
    let cars = await dbRepository.find(modelRepository.carModel, filterService.parseFilter(filter));

    for (let car of cars) {
      if (car.status === IN_USE) {
        throw ApiError.BadRequest('Car is using now.');
      }

      if (status === IN_USE) {
        const currentRun = await dbRepository.getRef(car, 'currentRun');
        if (!currentRun) {
          throw ApiError.BadRequest(`Car with id '${car._id}' has not current run.`);
        }

        const driver = await dbRepository.getRef(currentRun, 'driver');
        if (!driver.creditCard) {
          throw ApiError.BadRequest(
            `Credit card of driver with id '${driver._id}' has not been authorized.`
          );
        }
      }

      await dbRepository.updateOne(car, { status });
    }

    return cars;
  }

  async getCarsByFilter(filter) {
    const cars = await dbRepository.find(
      modelRepository.carModel,
      filterService.parseFilter(filter)
    );

    return cars;
  }

  async getReservedUnpaid() {
    const reservedCars = await dbRepository.find(modelRepository.carModel, { status: RESERVED });

    const reservedUnpaidCars = [];

    for (const car of reservedCars) {
      const currentRun = await dbRepository.getRef(car, 'currentRun');
      const driver = await dbRepository.getRef(currentRun, 'driver');

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
    const cars = await dbRepository.find(
      modelRepository.carModel,
      filterService.parseFilter(filter)
    );

    for (let car of cars) {
      car.geoLatitude = latitude;
      car.geoLongitude = longitude;

      await car.save();
    }

    return cars;
  }

  async remove(filter) {
    const cars = await dbRepository.find(
      modelRepository.carModel,
      filterService.parseFilter(filter)
    );

    for (let car of cars) {
      const currentRun = await dbRepository.getRef(car, 'currentRun');

      if (currentRun) {
        throw ApiError.BadRequest(
          `You try to remove car with id '${car._id}', which have the current run '${currentRun._id}'.`
        );
      }

      await dbRepository.deleteOne(car);
    }

    return cars;
  }
}

export default new CarService();

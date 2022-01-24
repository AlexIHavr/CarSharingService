import { Op } from 'sequelize';
import bookingModel from '../models/bookingModel.js';
import carModel from '../models/carModel.js';
import driverModel from '../models/driverModel.js';
import runModel from '../models/runModel.js';
import BaseService from './baseService.js';
import driverService from './driverService.js';
import runService from './runService.js';

class CarService extends BaseService {
  constructor() {
    super(carModel);
  }

  async addCar(data) {
    const newCar = await carModel.create(data);
    return newCar;
  }

  async setInUseCar(carId) {
    const car = await super.getOneModel({ id: carId });
    const run = await runService.getOneModel({ id: car.currentRun });

    await driverService.getDriverCreditCard(run.driver);

    await car.update({ status: 'in use' });

    return car;
  }

  async getUsingFewFuelCars() {
    const cars = await carModel.findAll({
      where: { status: 'in use', fuelLevel: { [Op.lt]: 25 } },
    });

    return cars;
  }

  async getReservedUnpaidCars() {
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

  async setInServiceCar() {
    const oldCars = await carModel.findAll({
      where: {
        mileage: { [Op.gt]: 100000 },
        productionDate: { [Op.lt]: new Date('01-01-2017') },
      },
    });

    for (let car of oldCars) {
      car.status = 'in Service';
      await car.save();
    }

    return oldCars;
  }

  async setCoordinatesCar() {
    let updatedCars = await carModel.findAll({
      where: {
        status: {
          [Op.notIn]: ['in use', 'reserved'],
        },
      },
    });

    const twoTimesBookingCars = [];

    for (let updatedCar of updatedCars) {
      const bookingCar = await bookingModel.findAll({
        where: { car: updatedCar.id },
      });

      if (bookingCar.length > 1) {
        twoTimesBookingCars.push(updatedCar);
        updatedCar.geoLatitude = 53.8882836;
        updatedCar.geoLongitude = 27.5442615;

        await updatedCar.save();
      }
    }

    return twoTimesBookingCars;
  }

  async setCarCurrentRun(carId, currentRunId) {
    await carModel.update(
      { currentRun: currentRunId, status: 'reserved' },
      { where: { id: carId } }
    );
  }

  async removeCarCurrentRun(carId) {
    await carModel.update({ currentRun: null, status: 'free' }, { where: { id: carId } });
  }

  async removeCar(VIN) {
    const car = await super.getOneModel({ VIN: VIN ?? '' });
    await car.destroy();

    return car;
  }
}

export default new CarService();

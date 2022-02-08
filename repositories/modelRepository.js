import { MONGO_DB, MYSQL } from '../constants/dataBases.js';

import carModelMongoDB from '../models/mongoModels/carModel.js';
import creditCardModelMongoDB from '../models/mongoModels/creditCardModel.js';
import driverModelMongoDB from '../models/mongoModels/driverModel.js';
import runModelMongoDB from '../models/mongoModels/runModel.js';
import bookingModelMongoDB from '../models/mongoModels/bookingModel.js';

import carModelSequelize from '../models/sequelizeModels/carModel.js';
import creditCardModelSequelize from '../models/sequelizeModels/creditCardModel.js';
import driverModelSequelize from '../models/sequelizeModels/driverModel.js';
import runModelSequelize from '../models/sequelizeModels/runModel.js';
import bookingModelSequelize from '../models/sequelizeModels/bookingModel.js';

class ModelRepository {
  constructor() {
    this._initModels();
  }

  _initModels() {
    switch (process.env.TYPE_DB) {
      case MYSQL:
        this.carModel = carModelSequelize;
        this.runModel = runModelSequelize;
        this.driverModel = driverModelSequelize;
        this.creditCardModel = creditCardModelSequelize;
        this.bookingModel = bookingModelSequelize;
        break;
      case MONGO_DB:
        this.carModel = carModelMongoDB;
        this.runModel = runModelMongoDB;
        this.driverModel = driverModelMongoDB;
        this.creditCardModel = creditCardModelMongoDB;
        this.bookingModel = bookingModelMongoDB;
        break;
    }
  }
}

export default new ModelRepository();

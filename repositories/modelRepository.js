import { MONGO_DB, MYSQL } from '../constants/dataBases.js';

class ModelRepository {
  constructor() {
    this._initModels();
  }

  _initModels() {
    switch (process.env.TYPE_DB) {
      case MYSQL:
        import('../models/sequelizeModels/carModel.js').then(
          (model) => (this.carModel = model.default)
        );
        import('../models/sequelizeModels/runModel.js').then(
          (model) => (this.runModel = model.default)
        );
        import('../models/sequelizeModels/driverModel.js').then(
          (model) => (this.driverModel = model.default)
        );
        import('../models/sequelizeModels/creditCardModel.js').then(
          (model) => (this.creditCardModel = model.default)
        );
        import('../models/sequelizeModels/bookingModel.js').then(
          (model) => (this.bookingModel = model.default)
        );
        break;
      case MONGO_DB:
        import('../models/mongoModels/carModel.js').then(
          (model) => (this.carModel = model.default)
        );
        import('../models/mongoModels/runModel.js').then(
          (model) => (this.runModel = model.default)
        );
        import('../models/mongoModels/driverModel.js').then(
          (model) => (this.driverModel = model.default)
        );
        import('../models/mongoModels/creditCardModel.js').then(
          (model) => (this.creditCardModel = model.default)
        );
        import('../models/mongoModels/bookingModel.js').then(
          (model) => (this.bookingModel = model.default)
        );
        break;
    }
  }
}

export default new ModelRepository();

import Joi from 'joi';
import operations from '../constants/operations.js';
import statuses from '../constants/statuses.js';

class ValidationSchemas {
  getIdSchema(idField) {
    return Joi.object({
      [idField]: this._getIdSchema().required(),
    });
  }

  get coordinatesSchema() {
    return this.carsByFilterSchema.append({
      latitude: this._getGeoLatitudeSchema().required(),
      longitude: this._getGeoLongitudeSchema().required(),
    });
  }

  get carsByFilterSchema() {
    return this._getCarsByFilterSchema().required();
  }

  get carStatusSchema() {
    return this._getCarsByFilterSchema().append({
      status: this._getStatusSchema().required(),
    });
  }

  _getCarsByFilterSchema() {
    return Joi.object({
      filter: Joi.array().items(
        Joi.object({
          id: this._getIdSchema(),
          VIN: Joi.string().trim().length(17),
          registrationNumber: Joi.string().trim(),
          brand: Joi.string().trim(),
          model: Joi.string().trim(),
          mileage: Joi.number().min(0),
          currentRun: this._getIdSchema(),
          productionDate: Joi.date(),
          status: this._getStatusSchema(),
          fuelLevel: Joi.number().integer().min(0).max(100),
          geoLatitude: this._getGeoLatitudeSchema(),
          geoLongitude: this._getGeoLongitudeSchema(),
          operation: Joi.string()
            .trim()
            .valid(...operations),
        })
      ),
    });
  }

  _getGeoLatitudeSchema() {
    return Joi.number().min(-90).max(90);
  }

  _getGeoLongitudeSchema() {
    return Joi.number().min(-180).max(180);
  }

  _getStatusSchema() {
    return Joi.string()
      .trim()
      .valid(...statuses);
  }

  _getIdSchema() {
    return Joi.string().trim().guid({ version: 'uuidv4' });
  }
}

export default new ValidationSchemas();

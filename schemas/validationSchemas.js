import Joi from 'joi';
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
    return this._getCarsByFilterSchema();
  }

  get carStatusSchema() {
    return this._getCarsByFilterSchema().append({
      status: this._getStatusSchema().required(),
    });
  }

  _getCarsByFilterSchema() {
    return Joi.object({
      filter: Joi.object({
        _id: this._getFieldFilterSchema(this._getIdSchema()),
        VIN: this._getFieldFilterSchema(Joi.string().trim().length(17)),
        registrationNumber: this._getFieldFilterSchema(Joi.string().trim()),
        brand: this._getFieldFilterSchema(Joi.string().trim()),
        model: this._getFieldFilterSchema(Joi.string().trim()),
        mileage: this._getFieldFilterSchema(Joi.number().min(0)),
        currentRun: this._getFieldFilterSchema(this._getIdSchema()),
        productionDate: this._getFieldFilterSchema(Joi.date()),
        status: this._getFieldFilterSchema(this._getStatusSchema()),
        fuelLevel: this._getFieldFilterSchema(Joi.number().integer().min(0).max(100)),
        geoLatitude: this._getFieldFilterSchema(this._getGeoLatitudeSchema()),
        geoLongitude: this._getFieldFilterSchema(this._getGeoLongitudeSchema()),
      }).prefs({ allowUnknown: false }),
    });
  }

  _getFieldFilterSchema(schema) {
    return Joi.alternatives().try(schema, Joi.object().prefs({ allowUnknown: false }));
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
    return Joi.alternatives().try(
      Joi.string().trim().guid({ version: 'uuidv4' }),
      Joi.string()
        .trim()
        .pattern(/^[0-9a-fA-F]{24}$/)
    );
  }
}

export default new ValidationSchemas();

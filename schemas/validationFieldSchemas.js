import Joi from 'joi';

class ValidationFieldSchemas {
  getIdFieldSchema(idField) {
    return {
      field: idField,
      schema: Joi.object({
        [idField]: Joi.string().guid({ version: 'uuidv4' }).required(),
      }),
    };
  }
}

export default new ValidationFieldSchemas();

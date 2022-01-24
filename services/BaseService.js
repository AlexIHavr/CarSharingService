import ApiError from '../errors/ApiError.js';

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getOneModel(fields) {
    console.log(fields);
    const item = await this.model.findOne({ where: fields });

    if (!item) {
      throw ApiError.BadRequest(`${this.model.name} does not exist.`);
    }

    return item;
  }
}

export default BaseService;

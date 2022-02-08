import { Sequelize } from 'sequelize';

class sequelizeRepository {
  constructor() {
    this.sequelize = this._initDB();
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      console.log(`Connection to DB has been established successfully.`);
    } catch (err) {
      console.error(err);
    }
  }

  async create(model, data) {
    const newItem = await model.create(data);
    return newItem;
  }

  async findById(model, id) {
    const item = await model.findByPk(id);
    return item;
  }

  async find(model, filter, fields) {
    const items = await model.findAll({ where: filter, attributes: fields });
    return items;
  }

  async updateOne(model, data) {
    await model.update(data);
    return model;
  }

  async updateOneByFilter(model, data, filter) {
    await model.update(data, { where: filter });
    return model;
  }

  async getRef(model, fieldWithRef) {
    const ref = await model[`get${fieldWithRef[0].toUpperCase() + fieldWithRef.slice(1)}`]();
    return ref;
  }

  async deleteOne(model) {
    const item = await model.destroy();
    return item;
  }

  _initDB() {
    const { NAME_DB, USER_NAME, PASSWORD, HOST, TYPE_DB } = process.env;

    try {
      return new Sequelize(NAME_DB, USER_NAME, PASSWORD, {
        host: HOST,
        dialect: TYPE_DB,
      });
    } catch (e) {
      return null;
    }
  }
}

export default new sequelizeRepository();

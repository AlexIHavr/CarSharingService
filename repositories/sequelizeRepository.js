import { Sequelize } from 'sequelize';

class sequelizeRepository {
  sequelize;

  constructor() {
    this.sequelize = this._initDB();
  }

  async connectDB() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      console.log(`Connection to DB has been established successfully.`);
    } catch (err) {
      console.error(err);
    }
  }

  _initDB() {
    const { TYPE_DB, NAME_DB, USER_NAME, PASSWORD, HOST } = process.env;

    return new Sequelize(NAME_DB, USER_NAME, PASSWORD, {
      host: HOST,
      dialect: TYPE_DB,
    });
  }
}

export default new sequelizeRepository();

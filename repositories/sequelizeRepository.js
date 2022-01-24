import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class SequelizeRepository {
  constructor() {
    this._initDB();
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

    this.sequelize = new Sequelize(NAME_DB, USER_NAME, PASSWORD, {
      host: HOST,
      dialect: TYPE_DB,
    });
  }
}

export default new SequelizeRepository();

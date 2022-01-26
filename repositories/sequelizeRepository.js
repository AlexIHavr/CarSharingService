import sequelize from '../config/config.js';

class SequelizeRepository {
  static async connectDB() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log(`Connection to DB has been established successfully.`);
    } catch (err) {
      console.error(err);
    }
  }
}

export default SequelizeRepository;

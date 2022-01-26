import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const { TYPE_DB, NAME_DB, USER_NAME, PASSWORD, HOST } = process.env;

const sequelize = new Sequelize(NAME_DB, USER_NAME, PASSWORD, {
  host: HOST,
  dialect: TYPE_DB,
});

export default sequelize;

import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import driverModel from './driverModel.js';

const runModel = sequelize.define(
  'Run',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg: 'Id must be UUID type.',
        },
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    driver: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: driverModel,
        key: 'id',
      },
    },
    startFuelLevel: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Min startFuelLevel equal 0',
        },
        max: {
          args: [100],
          msg: 'Max startFuelLevel equal 100',
        },
      },
    },
    startMileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Min startMileage equal 0',
        },
      },
    },
  },
  { indexes: [{ fields: ['driver'] }] }
);

export default runModel;

import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository.js';
import carModel from './carModel.js';
import runModel from './runModel.js';

const bookingModel = sequelizeRepository.sequelize.define('Booking', {
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
  car: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: carModel,
      key: 'id',
    },
  },
  run: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: runModel,
      key: 'id',
    },
  },
  finishFuelLevel: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Min finishFuelLevel equal 0',
      },
      max: {
        args: [100],
        msg: 'Max finishFuelLevel equal 100',
      },
    },
  },
  finishMileage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Min finishMileage equal 0',
      },
    },
  },
});

export default bookingModel;

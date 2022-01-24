import { DataTypes } from 'sequelize';
import sequelizeRepository from '../repositories/sequelizeRepository.js';
import driverModel from './driverModel.js';
import runModel from './runModel.js';

const carModel = sequelizeRepository.sequelize.define('Car', {
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
  VIN: {
    type: DataTypes.CHAR(17),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [17, 17],
        msg: 'VIN must have 17 chars',
      },
    },
  },
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Registration number must not be empty',
      },
    },
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Brand must not be empty',
      },
    },
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Model must not be empty',
      },
    },
  },
  productionDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'free',
    allowNull: false,
    validate: {
      isIn: {
        args: [['reserved', 'in use', 'unavailable', 'in Service', 'free']],
        msg: 'Status must be one of these: reserved, in use, unavailable, in Service, free',
      },
    },
  },
  fuelLevel: {
    type: DataTypes.TINYINT,
    defaultValue: 100,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Min fuelLevel equal 0',
      },
      max: {
        args: [100],
        msg: 'Max fuelLevel equal 100',
      },
    },
  },
  mileage: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Min mileage equal 0',
      },
    },
  },
  currentRun: {
    type: DataTypes.UUID,
    references: {
      model: runModel,
      key: 'id',
    },
  },
  geoLatitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [-90],
        msg: 'Min geoLatitude equal -90',
      },
      max: {
        args: [90],
        msg: 'Max geoLatitude equal 90',
      },
    },
  },
  geoLongitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [-180],
        msg: 'Min geoLongitude equal -180',
      },
      max: {
        args: [180],
        msg: 'Max geoLongitude equal 180',
      },
    },
  },
});

export default carModel;

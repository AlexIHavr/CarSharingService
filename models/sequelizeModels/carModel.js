import { DataTypes } from 'sequelize';
import statuses from '../../constants/statuses.js';
import sequelizeRepository from '../../repositories/sequelizeRepository.js';
import runModel from './runModel.js';

const carModel = sequelizeRepository.sequelize?.define('Car', {
  _id: {
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
        args: [statuses],
        msg: `Status must be one of these: ${statuses}`,
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

carModel?.belongsTo(runModel, {
  foreignKey: { name: 'currentRun', type: DataTypes.UUID, unique: true },
  as: 'CurrentRun',
});

export default carModel;

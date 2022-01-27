import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import creditCardModel from './creditCardModel.js';

const driverModel = sequelize.define('Driver', {
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
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: 'License number must not be empty',
      },
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'First name must not be empty',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Last name must not be empty',
      },
    },
  },
});

driverModel.belongsTo(creditCardModel, {
  foreignKey: { name: 'creditCard', type: DataTypes.UUID, unique: true },
});

export default driverModel;

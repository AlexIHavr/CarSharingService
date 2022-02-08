import { DataTypes } from 'sequelize';
import sequelizeRepository from '../../repositories/sequelizeRepository.js';

const creditCardModel = sequelizeRepository.sequelize?.define('CreditCard', {
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
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isCreditCard: {
        args: true,
        msg: 'Invalid credit card',
      },
    },
  },
  cardHolder: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Z]+\s[A-Z]+$/,
        msg: 'Invalid card holder. Example: IVAN IVANICH',
      },
    },
  },
  cardValidDate: {
    type: DataTypes.CHAR(5),
    allowNull: false,
    validate: {
      is: {
        args: /^\d\d\/\d\d$/i,
        msg: 'Invalid card date. Example: 05/23',
      },
    },
  },
});

export default creditCardModel;

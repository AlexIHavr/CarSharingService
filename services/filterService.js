import { Op } from 'sequelize';
import { GREATER, IN, LESS, NOT_IN, OPERATION } from '../constants/operations.js';

class FilterService {
  parseFilter(filter) {
    return !filter
      ? {}
      : filter.reduce((obj, filterField) => {
          const keys = Object.keys(filterField);
          const fieldName = !keys[1] ? keys[0] : keys[1] === OPERATION ? keys[0] : keys[1];
          obj[fieldName] = this._parseOperation(filterField[fieldName], filterField[OPERATION]);
          return obj;
        }, {});
  }

  _parseOperation(fieldValue, operation) {
    switch (operation) {
      case GREATER:
        return {
          [Op.gte]: fieldValue,
        };
      case LESS:
        return { [Op.lte]: fieldValue };
      case NOT_IN:
        return { [Op.notIn]: fieldValue.split(',') };
      case IN:
        return { [Op.in]: fieldValue.split(',') };
      default:
        return { [Op.eq]: fieldValue };
    }
  }
}

export default new FilterService();

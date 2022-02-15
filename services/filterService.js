import { Op } from 'sequelize';
import { MONGO_DB, MYSQL } from '../constants/dataBases.js';

class FilterService {
  constructor() {
    this.parseFilter = this._initParseFilter();
  }

  _initParseFilter() {
    return (filter) => {
      const parsedFilter = {};

      if (filter) {
        for (let field in filter) {
          if (filter[field]?.constructor !== Object) {
            parsedFilter[field] = filter[field];
          } else {
            parsedFilter[field] = {};
            for (let operation in filter[field]) {
              parsedFilter[field][this._getFilterOperation(operation)] = filter[field][operation];
            }
          }
        }
      }

      return parsedFilter;
    };
  }

  _getFilterOperation(operation) {
    switch (process.env.TYPE_DB) {
      case MYSQL:
        return Op[operation];
      case MONGO_DB:
        return '$' + operation;
    }
  }
}

export default new FilterService();

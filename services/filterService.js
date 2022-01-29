import { Op } from 'sequelize';

class FilterService {
  parseFilter(filter) {
    const parsedFilter = {};

    if (filter) {
      for (let field in filter) {
        if (filter[field]?.constructor !== Object) {
          parsedFilter[field] = filter[field];
        } else {
          for (let operation in filter[field]) {
            if (Op[operation]) parsedFilter[field][Op[operation]] = field[operation];
          }
        }
      }
    }

    return parsedFilter;
  }
}

export default new FilterService();

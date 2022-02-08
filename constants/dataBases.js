import mongoRepository from '../repositories/mongoRepository.js';
import sequelizeRepository from '../repositories/sequelizeRepository.js';

export const MYSQL = 'mysql';
export const MONGO_DB = 'mongoDB';

const DATA_BASE = (() => {
  switch (process.env.TYPE_DB) {
    case MYSQL:
      return sequelizeRepository;
    case MONGO_DB:
      return mongoRepository;
  }
})();
export default DATA_BASE;

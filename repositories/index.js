import { MONGO_DB, MYSQL } from '../constants/dataBases.js';

const dbRepository = await initDBRepository();

async function initDBRepository() {
  switch (process.env.TYPE_DB) {
    case MYSQL:
      const sequelizeRepository = await import('./sequelizeRepository.js');
      return sequelizeRepository.default;
    case MONGO_DB:
      const mongoRepository = await import('./mongoRepository.js');
      return mongoRepository.default;
  }
}

export default dbRepository;

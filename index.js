import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import baseRouter from './routers/baseRouter.js';
import sequelizeRepository from './repositories/sequelizeRepository.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import sqlErrorMiddleware from './middlewares/sqlErrorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

app.use(baseRouter);

app.use(sqlErrorMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  await sequelizeRepository.connectDB();
  console.log(`Server has been started on port ${process.env.PORT} ...`);
});

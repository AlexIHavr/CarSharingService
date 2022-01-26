import express from 'express';
import helmet from 'helmet';
import baseRouter from './routers/baseRouter.js';
import SequelizeRepository from './repositories/SequelizeRepository.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import sqlErrorMiddleware from './middlewares/sqlErrorMiddleware.js';

const app = express();

app.use(express.json());
app.use(helmet());

app.use(baseRouter);

app.use(sqlErrorMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  await SequelizeRepository.connectDB();
  console.log(`Server has been started on port ${process.env.PORT} ...`);
});

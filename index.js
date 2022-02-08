import express from 'express';
import helmet from 'helmet';
import './config/config.js';
import baseRouter from './routers/baseRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import dbErrorMiddleware from './middlewares/dbErrorMiddleware.js';
import DATA_BASE from './constants/dataBases.js';

const app = express();

app.use(express.json());
app.use(helmet());

app.use(baseRouter);

app.use(dbErrorMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  await DATA_BASE.connect();
  console.log(`Server has been started on port ${process.env.PORT} ...`);
});

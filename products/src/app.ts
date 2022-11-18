import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@somethingorg/common';

import { newProductRouter } from './routes/products/new';
import { showProductRouter } from './routes/products/show';
import { updateProductRouter } from './routes/products/update';
import { showAllProductsRouter } from './routes/products/show-all';

import { newFeedbackRouter } from './routes/feedback/new';
import { showAllFeedbackRouter } from './routes/feedback/show-all';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);

app.use(newProductRouter);
app.use(showProductRouter);
app.use(updateProductRouter);
app.use(showAllProductsRouter);

app.use(newFeedbackRouter);
app.use(showAllFeedbackRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

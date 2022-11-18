import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@somethingorg/common';

import { showCartByUserRouter } from './routes/cart/show-by-user';
import { addToCartRouter } from './routes/cart/add-to-cart';
import { updateCartOrder } from './routes/cart/update'
import { showProductsOfCartRouter } from './routes/cart/show-products-of-cart';

import { showOrderRouter } from './routes/order/show';
import { newOrderRouter } from './routes/order/new';
import { updateOrderRouter } from './routes/order/update';


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

app.use(showCartByUserRouter);
app.use(addToCartRouter);
app.use(updateCartOrder);
app.use(showProductsOfCartRouter);

app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(updateOrderRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

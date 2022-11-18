import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@somethingorg/common';
import { Cart } from '@somethingorg/cafeio-models';
import { Order } from '@somethingorg/cafeio-models';

const router = express.Router();

router.get('/api/orders/cart/products', requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const products = [{}];

  const order = await Order.find({ userId });
  if (!order) {
    throw new NotFoundError();
  }

  const cart = await Cart.find({ orderId: order[0]._id });
  if (!cart) {
    throw new NotFoundError();
  }

  cart.forEach(item => console.log(item));

  res.send(200);
});

export { router as showProductsOfCartRouter };

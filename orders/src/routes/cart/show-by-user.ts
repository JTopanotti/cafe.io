import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@somethingorg/common';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';

const router = express.Router();

router.get('/api/orders/cart', requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;

  const order = await Order.find({ userId, status: "OPEN" });
  if (!order) {
    throw new NotFoundError();
  }

  const cart = await Cart.find({ orderId: order[0]._id });
  if (!cart) {
    throw new NotFoundError();
  }

  res.send(cart);
});

export { router as showCartByUserRouter };

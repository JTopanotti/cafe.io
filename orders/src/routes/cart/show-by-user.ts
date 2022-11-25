import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@somethingorg/common';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';

const router = express.Router();

router.get('/api/orders/cart', requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;

  const orders = await Order.find({ userId, status: "OPEN" });
  if (!orders || orders.length === 0) {
    res.send(404);
  }
  console.log(orders);

  const cart = await Cart.find({ orderId: orders[0]._id });
  if (!cart || cart.length === 0) {
    throw new NotFoundError();
  }

  res.send(cart);
});

export { router as showCartByUserRouter };

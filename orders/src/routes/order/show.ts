import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@somethingorg/common';
import { Order } from '@somethingorg/cafeio-models';

const router = express.Router();

router.get('/api/orders/:id', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new NotFoundError();
  }
  res.send(order);
});

export { router as showOrderRouter };

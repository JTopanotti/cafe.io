import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth
} from '@somethingorg/common';
import { Order } from '@somethingorg/cafeio-models';

const router = express.Router();

router.put(
  '/api/orders/:id',
  requireAuth,
  [
    body('userId')
      .notEmpty()
      .withMessage('User Id is required'),
    body('total')
      .isNumeric()
      .withMessage('Total shoudl be numeric'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new NotFoundError();
    }

    order.set({ 
      cartId: req.body.cartId, 
      total: req.body.total, 
      date: req.body.date, 
      status: req.body.status, 
      paymentMethod: req.body.paymentMethod 
    });
    await order.save();

    res.send(order);
  }
);

export { router as updateOrderRouter };

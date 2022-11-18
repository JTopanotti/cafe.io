import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '@somethingorg/cafeio-models';

import { validateRequest, requireAuth } from '@somethingorg/common';


const router = express.Router();

router.post(
  '/api/orders',
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
    const { userId, total, date, status, paymentMethod }  = req.body;
    const order = Order.build({ 
      userId, 
      total, 
      date, 
      status, 
      paymentMethod 
    });
    await order.save();

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };

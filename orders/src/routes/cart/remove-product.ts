import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';

import { validateRequest, requireAuth, NotFoundError } from '@somethingorg/common';


const router = express.Router();

router.delete(
  '/api/orders/cart',
  requireAuth,
  [
    body('productId')
        .notEmpty()
        .withMessage('Product Id is required'),
    body('orderId')
        .notEmpty()
        .withMessage('Order Id is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId, orderId }  = req.body;
    console.log("Nani", productId, orderId);
    
    const carts = await Cart.find({ productId, orderId }).remove().exec();
    res.send(204);
  }
);

export { router as removeProductRouter };

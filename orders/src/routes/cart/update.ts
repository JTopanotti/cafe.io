import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth
} from '@somethingorg/common';
import { Cart } from '../../models/cart';

const router = express.Router();

router.put(
  '/api/orders/cart/:id',
  requireAuth,
  [
    body('orderId')
      .notEmpty()
      .withMessage('Order Id is required'),
    body('productId')
      .notEmpty()
      .withMessage('Product Id is required'),
    body('quantity')
      .isNumeric()
      .withMessage('Quantity is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      throw new NotFoundError();
    }

    cart.set({ 
      orderId: req.body.orderId, 
      productId: req.body.productId, 
      quantity: req.body.quantity
    });
    await cart.save();

    res.send(cart);
  }
);

export { router as updateCartOrder };

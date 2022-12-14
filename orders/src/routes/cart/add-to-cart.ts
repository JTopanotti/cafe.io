import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';

import { validateRequest, requireAuth } from '@somethingorg/common';


const router = express.Router();

router.post(
  '/api/orders/cart/add',
  requireAuth,
  [
    body('productId')
      .notEmpty()
      .withMessage('Product Id is required'),
    body('quantity')
      .notEmpty()
      .isNumeric()
      .withMessage('Quantity is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId, quantity }  = req.body;
    const userId = req.currentUser!!.id;
    let orders = await Order.find({ userId, status: "OPEN" });
    
    if (orders.length === 0) {
      const orderModel = Order.build({ 
        userId, 
        total: 0, 
        date: new Date(), 
        status: "OPEN", 
        paymentMethod: "" 
      });
      await orderModel.save();

      orders = await Order.find({ userId, status: "OPEN" });
    }
    
    let carts = await Cart.find({ orderId: orders[0]._id, productId });
    let cart = (carts.length >= 0) ? carts[0] : null;

    if (!cart) {
      console.log("SDg", orders[0]._id);
      console.log("SDg", typeof orders[0]._id);
      
      const cartModel = Cart.build({ 
        orderId: orders[0]._id, 
        productId, 
        quantity, 
      });
      console.log("Cart Model", cartModel);
      
      await cartModel.save();
    } else {
      const cart = carts[0];
      cart.quantity += quantity;
      cart.save();
    }    

    carts = await Cart.find({ orderId: orders[0]._id });
    res.status(200).send(carts);
  }
);

export { router as addToCartRouter };

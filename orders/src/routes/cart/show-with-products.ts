import express, { json, Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@somethingorg/common';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import axios from 'axios';

const router = express.Router();

router.get('/api/orders/cart/products', requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const products: any[] = [];

  const order = await Order.find({ userId, status: "OPEN" });
  if (!order) {
    throw new NotFoundError();
  }
  console.log("Order", order);

  const carts = await Cart.find({ orderId: order[0]._id });
  if (!carts || carts.length === 0) {
    throw new NotFoundError();
  }

  for (let item of carts) {
    const resp = await axios.get(
      'http://cafeio-products-srv:3000/api/products/' + item.productId, 
      { headers: req.headers }
    );
    
    if (resp?.data?.name) {
      products.push({...resp.data, quantity: item.quantity});
    }
  }

  let total = 0;
  for (let product of products) {
    total += product.price * product.quantity;
  }

  res.send({ cart: carts[0], products, total });
});

export { router as showCartWithProducts };

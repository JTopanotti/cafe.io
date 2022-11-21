import express, { Request, Response } from 'express';
import { requireAuth } from '@somethingorg/common';
import { Product } from '../../models/product';

const router = express.Router();

router.get('/api/products', requireAuth, async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.send(products);
});

export { router as showAllProductsRouter };

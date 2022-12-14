import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
} from '@somethingorg/common';
import { Product } from '../../models/product';

const router = express.Router();

router.put(
  '/api/products/:id',
  requireAuth,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    product.set({
      name: req.body.name, 
      description: req.body.description, 
      registrationDate: product.registrationDate, 
      price: req.body.price, 
      quantity: req.body.quantity,
      photoId: (req.body.photoId) ? req.body.photoId : product.photoId
    });
    await product.save();

    res.send(product);
  }
);

export { router as updateProductRouter };

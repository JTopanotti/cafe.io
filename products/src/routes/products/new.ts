import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../../models/product';

import { validateRequest, requireAuth } from '@somethingorg/common';


const router = express.Router();

router.post(
  '/api/products',
  requireAuth,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('registrationDate')
      .notEmpty()
      .withMessage('Registration Date is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, description, registrationDate, price, quantity }  = req.body;
    const product = Product.build({ 
      name, 
      description, 
      registrationDate, 
      price, 
      quantity
    });
    await product.save();

    res.status(201).send(product);
  }
);

export { router as newProductRouter };

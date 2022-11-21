import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Feedback } from '../../models/feedback';

import { validateRequest, requireAuth, NotFoundError } from '@somethingorg/common';


const router = express.Router();

router.post(
  '/api/products/feedback',
  requireAuth,
  [
    body('productId')
      .notEmpty()
      .withMessage('Product Id is required'),
    body('userId')
      .notEmpty()
      .withMessage('User Id is required'),
    body('feedback')
      .trim()
      .notEmpty()
      .withMessage('Feedback is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId, userId, feedback }  = req.body;

    // const user = User.findById(userId);
    // if (!user) {
    //   throw new NotFoundError();
    // }

    // const product = Product.findById(productId);
    // if (!product) {
    //   throw new NotFoundError();
    // }

    const feedbackModel = Feedback.build({ 
      productId, 
      userId, 
      feedback,
    });
    
    await feedbackModel.save();
    res.status(201).send(feedbackModel);
  }
);

export { router as newFeedbackRouter };

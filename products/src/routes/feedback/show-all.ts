import express, { Request, Response } from 'express';
import { requireAuth } from '@somethingorg/common';
import { Feedback } from '../../models/feedback';

const router = express.Router();

router.get('/api/products/feedback', requireAuth, async (req: Request, res: Response) => {
  const feedback = await Feedback.find({});
  res.send(feedback);
});

export { router as showAllFeedbackRouter };

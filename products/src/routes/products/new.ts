import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../../models/product';
import { validateRequest, requireAuth, NotFoundError } from '@somethingorg/common';
import { Readable } from 'stream';
import multer from 'multer';
import mongoose from 'mongoose';
let storage = multer.memoryStorage()
let upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
const router = express.Router();

router.post(
  '/api/products',
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
    const { name, description, price, quantity, photoId }  = req.body;
    
    const product = Product.build({ 
      name, 
      description, 
      registrationDate: new Date(), 
      price, 
      quantity,
      photoId
    });

    await product.save();

    res.status(201).send(product);
  }
);

router.post(
  '/api/products/photo', 
  requireAuth, 
  upload.single('imageFile'), 
  async (req: Request, res: Response) => {  
    let photoName = req.file?.originalname;
    
    // Covert buffer to Readable Stream
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(req.file?.buffer);
    readablePhotoStream.push(null);

    var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'photos'
    });

    let uploadStream = bucket.openUploadStream(photoName ? photoName : "productId_photo");
    let id = uploadStream.id;
    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', async () => {
      return res.status(201).json({photoId: id});
    });
  }
);

export { router as newProductRouter };

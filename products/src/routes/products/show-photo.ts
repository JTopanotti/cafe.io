import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@somethingorg/common';
import { Product } from '../../models/product';
import mongoose from 'mongoose';
import { Base64Encode } from 'base64-stream';
import concat from 'concat-stream';

const router = express.Router();

router.get('/api/products/photo/:id',requireAuth, async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  const base64Encode = new Base64Encode()
  const cbConcat = (base64: any) => {
    res.send(base64);
  }


  if (!product) {
    throw new NotFoundError();
  }

  var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'photos'
  });

  var objectId = new mongoose.Types.ObjectId(product.photoId);
  let stream = bucket.openDownloadStream(objectId);

  bucket.openDownloadStream(objectId)
    .pipe(base64Encode)
    .pipe(concat(cbConcat))
    .on('error', (err) => console.log("Pipe error", err));
});

export { router as showProductPhotoRouter };

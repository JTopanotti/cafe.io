import mongoose, { ObjectId, Schema } from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Product
interface ProductAttrs {
  name: string;
  description: string;
  registrationDate: Date;
  price: number;
  quantity: number;
  photoId: string;
}

// An interface that describes the properties
// that a Product Model has
interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

// An interface that describes the properties
// that a Product Document has
interface ProductDoc extends mongoose.Document {
  name: string;
  description: string;
  registrationDate: Date;
  price: number;
  quantity: number;
  photoId: string;
}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    registrationDate: {
      type: Date,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number
    },
    photoId:{ type: String }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

ProductSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', ProductSchema);

export { Product };

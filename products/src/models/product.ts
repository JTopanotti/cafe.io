import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Product
interface ProductAttrs {
  name: string;
  description: string;
  registrationDate: Date;
  price: number;
  quantity: number;
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

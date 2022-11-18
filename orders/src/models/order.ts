import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Order
interface OrderAttrs {
  userId: string;
  total: number;
  date: Date;
  status: string;
  paymentMethod: string;
}

// An interface that describes the properties
// that a Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// An interface that describes the properties
// that a Order Document has
interface OrderDoc extends mongoose.Document {
  userId: string;
  total: number;
  date: Date;
  status: string;
  paymentMethod: string;
}

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    total: {
      type: Number
    },
    date: {
      type: Date
    },
    status: {
      type: String
    },
    paymentMethod: {
      type: String
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

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export { Order };

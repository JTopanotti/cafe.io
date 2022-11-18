import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Cart
interface CartAttrs {
    orderId: string;
    productId: string;
    quantity: number;
}

// An interface that describes the properties
// that a Cart Model has
interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}

// An interface that describes the properties
// that a Cart Document has
interface CartDoc extends mongoose.Document {
    orderId: string;
    productId: string;
    quantity: number;
}

const CartSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
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

CartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>('Cart', CartSchema);

export { Cart };

import mongoose from 'mongoose';
interface CartAttrs {
    orderId: string;
    productId: string;
    quantity: number;
}
interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}
interface CartDoc extends mongoose.Document {
    orderId: string;
    productId: string;
    quantity: number;
}
declare const Cart: CartModel;
export { Cart };

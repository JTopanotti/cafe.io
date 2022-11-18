import mongoose from 'mongoose';
interface OrderAttrs {
    userId: string;
    total: number;
    date: Date;
    status: string;
    paymentMethod: string;
}
interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}
interface OrderDoc extends mongoose.Document {
    userId: string;
    total: number;
    date: Date;
    status: string;
    paymentMethod: string;
}
declare const Order: OrderModel;
export { Order };

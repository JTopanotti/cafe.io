import mongoose from 'mongoose';
interface ProductAttrs {
    name: string;
    description: string;
    registrationDate: Date;
    price: number;
    quantity: number;
}
interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc;
}
interface ProductDoc extends mongoose.Document {
    name: string;
    description: string;
    registrationDate: Date;
    price: number;
    quantity: number;
}
declare const Product: ProductModel;
export { Product };

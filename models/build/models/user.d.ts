import mongoose from 'mongoose';
interface UserAttrs {
    username: string;
    email: string;
    password: string;
    mailingAddress: string;
    monthlySubscription: boolean;
}
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}
interface UserDoc extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    mailingAddress: string;
    monthlySubscription: boolean;
}
declare const User: UserModel;
export { User };

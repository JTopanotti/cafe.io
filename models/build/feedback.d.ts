import mongoose from 'mongoose';
interface FeedbackAttrs {
    productId: string;
    userId: string;
    feedback: string;
}
interface FeedbackModel extends mongoose.Model<FeedbackDoc> {
    build(attrs: FeedbackAttrs): FeedbackDoc;
}
interface FeedbackDoc extends mongoose.Document {
    productId: string;
    userId: string;
    feedback: string;
}
declare const Feedback: FeedbackModel;
export { Feedback };

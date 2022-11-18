import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Feedback
interface FeedbackAttrs {
  productId: string;
  userId: string;
  feedback: string;
}

// An interface that describes the properties
// that a Feedback Model has
interface FeedbackModel extends mongoose.Model<FeedbackDoc> {
  build(attrs: FeedbackAttrs): FeedbackDoc;
}

// An interface that describes the properties
// that a Feedback Document has
interface FeedbackDoc extends mongoose.Document {
    productId: string;
    userId: string;
    feedback: string;
}

const FeedbackSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    feedback: {
      type: String,
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

FeedbackSchema.statics.build = (attrs: FeedbackAttrs) => {
  return new Feedback(attrs);
};

const Feedback = mongoose.model<FeedbackDoc, FeedbackModel>('Feedback', FeedbackSchema);

export { Feedback };

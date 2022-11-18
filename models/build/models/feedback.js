"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var FeedbackSchema = new mongoose_1.default.Schema({
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
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
FeedbackSchema.statics.build = function (attrs) {
    return new Feedback(attrs);
};
var Feedback = mongoose_1.default.model('Feedback', FeedbackSchema);
exports.Feedback = Feedback;

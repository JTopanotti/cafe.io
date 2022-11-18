"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var OrderSchema = new mongoose_1.default.Schema({
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
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
OrderSchema.statics.build = function (attrs) {
    return new Order(attrs);
};
var Order = mongoose_1.default.model('Order', OrderSchema);
exports.Order = Order;


import { Document, model, Schema, Types } from "mongoose";

export interface IOrderModel extends Document {
    userId: Types.ObjectId;
    productId: number;
    price: number;
    createdAt: Date;
};

const orderSchema = new Schema<IOrderModel>({
   userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
   },
   productId: {
    type: Number,
    required: [true, "Product ID is required"],
   },
   price: {
    type: Number,
    required: [true, "Price is required"],
   }
}, {
    timestamps: true
});

export const OrderModel = model<IOrderModel>("Order", orderSchema);
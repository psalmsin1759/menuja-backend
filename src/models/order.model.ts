import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  orderId: string;
  payment_type: string;
  amount: number;
  table?: string;
  payment_status: "paid" | "not paid";
  order_status: "pending" | "completed" | "cancel";
  customerName?: string | null;
  customerEmail?: string | null;
  admin?: Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    payment_type: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    table: {
      type: String,
      trim: true,
    },
    payment_status: {
      type: String,
      enum: ["paid", "not paid"],
      default: "not paid",
    },
    order_status: {
      type: String,
      enum: ["pending", "completed", "cancel"],
      default: "pending",
    },
    customerName: {
      type: String,
      default: null,
      trim: true,
    },
    customerEmail: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);

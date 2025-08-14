import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  name: string;
  pubKey: string;
  secretKey: string;
  active: boolean;
  webhook?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema(
  {
    name: {
      type: String, 
      required: true,
      trim: true,
      unique: true,
    },
    pubKey: {
      type: String,
      required: true,
      trim: true,
    },
    secretKey: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    webhook: {
      type: String, 
      trim: true,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

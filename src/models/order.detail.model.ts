import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderDetails extends Document {
  order: Types.ObjectId; 
  food: Types.ObjectId; 
  quantity: number;
  price: number; 
  total: number; 
  createdAt: Date;
  updatedAt: Date;
}

const OrderDetailsSchema: Schema<IOrderDetails> = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);


OrderDetailsSchema.pre<IOrderDetails>("save", function (next) {
  this.total = this.quantity * this.price;
  next();
});

export const OrderDetails = mongoose.model<IOrderDetails>(
  "OrderDetails",
  OrderDetailsSchema
);

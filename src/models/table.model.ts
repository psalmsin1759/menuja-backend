import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurantTable extends Document {
  name: string;
  qrCodePath?: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RestaurantTableSchema: Schema<IRestaurantTable> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    qrCodePath: {
      type: String, 
      trim: true,
    },
    url: {
      type: String, 
      trim: true,
    },
  },
  { timestamps: true }
);

export const RestaurantTable = mongoose.model<IRestaurantTable>(
  "RestaurantTable",
  RestaurantTableSchema
);

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFood extends Document {
  name: string;
  description?: string;
  photo?: string;
  price: number;
  available: boolean;
  feature: boolean;
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FoodSchema: Schema<IFood> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    photo: {
      type: String, 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    feature: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const Food = mongoose.model<IFood>("Food", FoodSchema);

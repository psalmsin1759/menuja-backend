import { Schema, model, Document } from "mongoose";

export interface IQrCodeScan extends Document {
  tableId: Schema.Types.ObjectId; 
  scannedAt: Date;
  scannedByIP?: string;
  userAgent?: string;
}

const qrCodeScanSchema = new Schema<IQrCodeScan>(
  {
    tableId: {
      type: Schema.Types.ObjectId,
      ref: "RestaurantTable",
      required: true,
    },
    scannedAt: {
      type: Date,
      default: Date.now,
    },
    scannedByIP: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

export const QrCodeScan = model<IQrCodeScan>("QrCodeScan", qrCodeScanSchema);

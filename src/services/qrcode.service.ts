
import { Types } from "mongoose";
import { QrCodeScan, IQrCodeScan } from "../models/qr.scan.model";

export class QrCodeScanService {
  async recordScan(
    tableId: string,
    scannedByIP?: string,
    userAgent?: string
  ): Promise<IQrCodeScan> {
    if (!Types.ObjectId.isValid(tableId)) {
      throw new Error("Invalid table ID");
    }
    const scan = new QrCodeScan({
      tableId,
      scannedByIP,
      userAgent,
      scannedAt: new Date(),
    });
    return scan.save();
  }

  async getAllScans(): Promise<IQrCodeScan[]> {
    return QrCodeScan.find()
      .populate("tableId", "name number")
      .sort({ scannedAt: -1 });
  }

  async getScansByTable(tableId: string): Promise<IQrCodeScan[]> {
    if (!Types.ObjectId.isValid(tableId)) {
      throw new Error("Invalid table ID");
    }
    return QrCodeScan.find({ tableId })
      .populate("tableId", "name number")
      .sort({ scannedAt: -1 });
  }

  async deleteScan(id: string): Promise<IQrCodeScan | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid scan ID");
    }
    return QrCodeScan.findByIdAndDelete(id);
  }
}

export const qrCodeScanService = new QrCodeScanService();

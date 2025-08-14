import { Request, Response } from "express";
import { qrCodeScanService } from "../services/qrcode.service";

export class QrCodeScanController {
  async recordScan(req: Request, res: Response) {
    try {
      const { tableId } = req.body;
      const scannedByIP = req.ip;
      const userAgent = req.headers["user-agent"];

      const scan = await qrCodeScanService.recordScan(
        tableId,
        scannedByIP,
        userAgent
      );
      res.status(201).json(scan);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllScans(req: Request, res: Response) {
    try {
      const scans = await qrCodeScanService.getAllScans();
      res.status(200).json(scans);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getScansByTable(req: Request, res: Response) {
    try {
      const scans = await qrCodeScanService.getScansByTable(req.params.tableId!);
      res.status(200).json(scans);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteScan(req: Request, res: Response) {
    try {
      const deleted = await qrCodeScanService.deleteScan(req.params.id!);
      if (!deleted) {
        return res.status(404).json({ message: "Scan not found" });
      }
      res.status(200).json({ message: "Scan deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const qrCodeScanController = new QrCodeScanController();

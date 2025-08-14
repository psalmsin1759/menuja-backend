import { Router } from "express";
import { qrCodeScanController } from "../controllers/qrcode.controller";
import { validate } from "../middlewares/validate.middleware";
import { createQrCodeScanSchema } from "../validators/qrcodescan.validator";

const qrRouter = Router();

/**
 * @swagger
 * tags:
 *   name: QrCodeScan
 *   description: QR code scan records
 */

/**
 * @swagger
 * /qrcodescans:
 *   post:
 *     summary: Record a QR code scan
 *     tags: [QrCodeScan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QrCodeScanInput'
 *     responses:
 *       201:
 *         description: Scan recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QrCodeScan'
 *       400:
 *         description: Invalid request
 */
qrRouter.post("/", validate(createQrCodeScanSchema), qrCodeScanController.recordScan);

/**
 * @swagger
 * /qrcodescans:
 *   get:
 *     summary: Get all QR code scans
 *     tags: [QrCodeScan]
 *     responses:
 *       200:
 *         description: List of scans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QrCodeScan'
 */
qrRouter.get("/", qrCodeScanController.getAllScans);

/**
 * @swagger
 * /qrcodescans/table/{tableId}:
 *   get:
 *     summary: Get scans by table ID
 *     tags: [QrCodeScan]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         schema:
 *           type: string
 *         required: true
 *         description: Table ID
 *     responses:
 *       200:
 *         description: List of scans for a table
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QrCodeScan'
 */
qrRouter.get("/table/:tableId", qrCodeScanController.getScansByTable);

/**
 * @swagger
 * /qrcodescans/{id}:
 *   delete:
 *     summary: Delete a QR code scan
 *     tags: [QrCodeScan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Scan ID
 *     responses:
 *       200:
 *         description: Scan deleted successfully
 *       404:
 *         description: Scan not found
 */
qrRouter.delete("/:id", qrCodeScanController.deleteScan);

export default qrRouter;

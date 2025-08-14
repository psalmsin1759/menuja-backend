import { Router } from "express";
import { paymentController } from "../controllers/payment.controller";
import { createPaymentSchema, updatePaymentSchema } from "../validators/payment.validator";

import { validate } from "../middlewares/validate.middleware";

const paymentRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment method management
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment method
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       201:
 *         description: Payment method created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
paymentRouter.post("/", validate(createPaymentSchema), paymentController.createPayment.bind(paymentController));

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payment methods
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
paymentRouter.get("/", paymentController.getAllPayments.bind(paymentController));

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment method by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
paymentRouter.get("/:id", paymentController.getPaymentById.bind(paymentController));

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment method
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
paymentRouter.put("/:id", validate(updatePaymentSchema), paymentController.updatePayment.bind(paymentController));

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment method
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 */
paymentRouter.delete("/:id", paymentController.deletePayment.bind(paymentController));

/**
 * @swagger
 * /payments/{id}/toggle:
 *   patch:
 *     summary: Toggle payment method active status
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [active]
 *             properties:
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Payment active status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
paymentRouter.patch("/:id/toggle", paymentController.toggleActive.bind(paymentController));

export default paymentRouter;

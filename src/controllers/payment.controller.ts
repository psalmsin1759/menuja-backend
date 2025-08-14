import { Request, Response } from "express";
import { paymentService } from "../services/payment.service";

export class PaymentController {
  async createPayment(req: Request, res: Response) {
    try {
      const payment = await paymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await paymentService.getAllPayments();
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPaymentById(req: Request, res: Response) {
    try {
      const payment = await paymentService.getPaymentById(req.params.id!);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const updated = await paymentService.updatePayment(
        req.params.id!,
        req.body
      );
      if (!updated) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePayment(req: Request, res: Response) {
    try {
      await paymentService.deletePayment(req.params.id!);
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async toggleActive(req: Request, res: Response) {
    try {
      const { active } = req.body;
      const updated = await paymentService.toggleActive(
        req.params.id!,
        active
      );
      if (!updated) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const paymentController = new PaymentController();

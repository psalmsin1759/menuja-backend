import { Types } from "mongoose";
import { Payment, IPayment } from "../models/payment.model";

export class PaymentService {
  async createPayment(
    data: Omit<IPayment, keyof Document | "createdAt" | "updatedAt">
  ): Promise<IPayment> {
    const payment = new Payment(data);
    return payment.save();
  }

  async getAllPayments(): Promise<IPayment[]> {
    return Payment.find().sort({ createdAt: -1 });
  }

  async getPaymentById(id: string): Promise<IPayment | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid payment ID");
    }
    return Payment.findById(id);
  }

  async updatePayment(
    id: string,
    data: Partial<IPayment>
  ): Promise<IPayment | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid payment ID");
    }
    return Payment.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePayment(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid payment ID");
    }
    await Payment.findByIdAndDelete(id);
  }

  async toggleActive(id: string, active: boolean): Promise<IPayment | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid payment ID");
    }
    return Payment.findByIdAndUpdate(id, { active }, { new: true });
  }
}

export const paymentService = new PaymentService();

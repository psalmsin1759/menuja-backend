
import { Request, Response } from "express";
import { orderService } from "../services/order.service";

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { orderData, orderItems } = req.body;
      const result = await orderService.createOrder(orderData, orderItems);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderById(req.params.id!);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const updated = await orderService.updateOrder(req.params.id!, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      await orderService.deleteOrder(req.params.id!);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async addOrderItem(req: Request, res: Response) {
    try {
      const { foodId, quantity, price } = req.body;
      const detail = await orderService.addOrderItem(
        req.params.orderId!,
        foodId,
        quantity,
        price
      );
      res.status(201).json(detail);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateOrderItem(req: Request, res: Response) {
    try {
      const updated = await orderService.updateOrderItem(
        req.params.detailId!,
        req.body
      );
      if (!updated) {
        return res.status(404).json({ message: "Order item not found" });
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrderItem(req: Request, res: Response) {
    try {
      const deleted = await orderService.deleteOrderItem(req.params.detailId!);
      if (!deleted) {
        return res.status(404).json({ message: "Order item not found" });
      }
      res.status(200).json({ message: "Order item deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrderDetails(req: Request, res: Response) {
    try {
      const details = await orderService.getOrderDetails(req.params.orderId!);
      res.status(200).json(details);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const orderController = new OrderController();

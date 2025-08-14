import { Types } from "mongoose";
import { Order, IOrder } from "../models/order.model";
import { OrderDetails, IOrderDetails } from "../models/order.detail.model";

export class OrderService {
  async createOrder(
    orderData: Omit<IOrder, keyof Document | "createdAt" | "updatedAt">,
    orderItems: { food: string; quantity: number; price: number }[]
  ): Promise<{ order: IOrder; details: IOrderDetails[] }> {
    const order = new Order(orderData);
    await order.save();

    const details = (await OrderDetails.insertMany(
      orderItems.map((item) => ({
        order: order._id as Types.ObjectId,
        food: new Types.ObjectId(item.food),
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      }))
    )) as IOrderDetails[];

    return { order, details };
  }

  async getAllOrders(): Promise<IOrder[]> {
    return Order.find()
      .populate("admin", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }
    return Order.findById(id)
      .populate("admin", "firstName lastName email")
      .populate({
        path: "details",
        populate: { path: "food", select: "name price" },
      });
  }

  async updateOrder(id: string, data: Partial<IOrder>): Promise<IOrder | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }
    return Order.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
  }

  async deleteOrder(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }
    await OrderDetails.deleteMany({ order: id });
    await Order.findByIdAndDelete(id);
  }

  async addOrderItem(
    orderId: string,
    foodId: string,
    quantity: number,
    price: number
  ): Promise<IOrderDetails> {
    if (!Types.ObjectId.isValid(orderId) || !Types.ObjectId.isValid(foodId)) {
      throw new Error("Invalid ID(s)");
    }
    const detail = new OrderDetails({
      order: orderId,
      food: foodId,
      quantity,
      price,
      total: quantity * price,
    });
    return detail.save();
  }

  async updateOrderItem(
    detailId: string,
    data: Partial<Pick<IOrderDetails, "quantity" | "price">>
  ): Promise<IOrderDetails | null> {
    if (!Types.ObjectId.isValid(detailId)) {
      throw new Error("Invalid order detail ID");
    }

    const updateData: any = { ...data };
    if (data.quantity !== undefined && data.price !== undefined) {
      updateData.total = data.quantity * data.price;
    } else if (data.quantity !== undefined) {
      const existing = await OrderDetails.findById(detailId);
      if (existing) {
        updateData.total = data.quantity * existing.price;
      }
    } else if (data.price !== undefined) {
      const existing = await OrderDetails.findById(detailId);
      if (existing) {
        updateData.total = existing.quantity * data.price;
      }
    }

    return OrderDetails.findByIdAndUpdate(detailId, updateData, { new: true });
  }

  async deleteOrderItem(detailId: string): Promise<IOrderDetails | null> {
    if (!Types.ObjectId.isValid(detailId)) {
      throw new Error("Invalid order detail ID");
    }
    return OrderDetails.findByIdAndDelete(detailId);
  }

  async getOrderDetails(orderId: string): Promise<IOrderDetails[]> {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid order ID");
    }
    return OrderDetails.find({ order: orderId }).populate("food", "name price");
  }


  async getOrderCount(): Promise<number> {
    return Order.countDocuments();
  }


  async getTotalRevenue(): Promise<number> {
    const result = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    return result[0]?.totalRevenue || 0;
  }


  async getMostSoldFoods(limit = 6): Promise<{ food: string; count: number }[]> {
    const result = await OrderDetails.aggregate([
      {
        $group: {
          _id: "$food",
          count: { $sum: "$quantity" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "_id",
          as: "foodDetails",
        },
      },
      {
        $unwind: "$foodDetails",
      },
      {
        $project: {
          _id: 0,
          food: "$foodDetails.name",
          count: 1,
        },
      },
    ]);

    return result;
  }


  async getMonthlyRevenue(): Promise<{ month: string; revenue: number }[]> {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              {
                $arrayElemAt: [
                  [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  { $subtract: ["$_id", 1] },
                ],
              },
            ],
          },
          revenue: 1,
        },
      },
    ]);

    return result;
  }
}

export const orderService = new OrderService();

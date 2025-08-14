
import { Types } from "mongoose";
import { RestaurantTable, IRestaurantTable } from "../models/table.model";

export class RestaurantTableService {
  async createTable(data: Omit<IRestaurantTable, keyof Document | "createdAt" | "updatedAt">): Promise<IRestaurantTable> {
    const table = new RestaurantTable(data);
    return table.save();
  }

  async getAllTables(): Promise<IRestaurantTable[]> {
    return RestaurantTable.find().sort({ createdAt: -1 });
  }

  async getTableById(id: string): Promise<IRestaurantTable | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid table ID");
    }
    return RestaurantTable.findById(id);
  }

  async updateTable(id: string, data: Partial<IRestaurantTable>): Promise<IRestaurantTable | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid table ID");
    }
    return RestaurantTable.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
  }

  async deleteTable(id: string): Promise<IRestaurantTable | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid table ID");
    }
    return RestaurantTable.findByIdAndDelete(id);
  }
}

export const restaurantTableService = new RestaurantTableService();

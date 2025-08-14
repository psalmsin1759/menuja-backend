import { Food, IFood } from "../models/food.model";
import { Types } from "mongoose";

export class FoodService {
  async createFood(data: Partial<IFood>): Promise<IFood> {
    const food = new Food(data);
    return food.save();
  }

  async getAllFoods(): Promise<IFood[]> {
    return Food.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
  }

  async getFoodById(id: string): Promise<IFood | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid food ID");
    }
    return Food.findById(id).populate("category", "name");
  }

  async updateFood(id: string, data: Partial<IFood>): Promise<IFood | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid food ID");
    }
    return Food.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFood(id: string): Promise<IFood | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid food ID");
    }
    return Food.findByIdAndDelete(id);
  }
}

export const foodService = new FoodService();

import { Request, Response } from "express";
import { foodService } from "../services/food.service";

export class FoodController {
  async create(req: Request, res: Response) {
    try {
      const food = await foodService.createFood(req.body);
      res.status(201).json(food);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const foods = await foodService.getAllFoods();
      res.json(foods);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const food = await foodService.getFoodById(req.params.id!);
      if (!food) return res.status(404).json({ message: "Food not found" });
      res.json(food);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const food = await foodService.updateFood(req.params.id!, req.body);
      if (!food) return res.status(404).json({ message: "Food not found" });
      res.json(food);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const food = await foodService.deleteFood(req.params.id!);
      if (!food) return res.status(404).json({ message: "Food not found" });
      res.json({ message: "Food deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const foodController = new FoodController();

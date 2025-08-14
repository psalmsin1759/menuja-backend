import { Request, Response } from "express";
import { restaurantTableService } from "../services/restaurantTable.service";

export class RestaurantTableController {
  async createTable(req: Request, res: Response) {
    try {
      const table = await restaurantTableService.createTable(req.body);
      res.status(201).json(table);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllTables(req: Request, res: Response) {
    try {
      const tables = await restaurantTableService.getAllTables();
      res.status(200).json(tables);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTableById(req: Request, res: Response) {
    try {
      const table = await restaurantTableService.getTableById(req.params.id!);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.status(200).json(table);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateTable(req: Request, res: Response) {
    try {
      const updated = await restaurantTableService.updateTable(req.params.id!, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTable(req: Request, res: Response) {
    try {
      const deleted = await restaurantTableService.deleteTable(req.params.id!);
      if (!deleted) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.status(200).json({ message: "Table deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const restaurantTableController = new RestaurantTableController();

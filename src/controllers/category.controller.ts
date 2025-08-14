// controllers/category.controller.ts
import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name?.trim()) {
        return res.status(400).json({ message: "Category name is required" });
      }
      const category = await categoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id!);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name?.trim()) {
        return res.status(400).json({ message: "Category name is required" });
      }
      const category = await categoryService.updateCategory(id!, name);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.deleteCategory(id!);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const categoryController = new CategoryController();

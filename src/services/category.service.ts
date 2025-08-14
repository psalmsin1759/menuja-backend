
import { Category, ICategory } from "../models/category.model";
import { Types } from "mongoose";

export class CategoryService {

   async createCategory(name: string): Promise<ICategory> {
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      throw new Error("Category with this name already exists");
    }
    const category = new Category({ name });
    return category.save();
  }


   async getAllCategories(): Promise<ICategory[]> {
    return Category.find().sort({ createdAt: -1 });
  }


   async getCategoryById(id: string): Promise<ICategory | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID");
    }
    return Category.findById(id);
  }


   async updateCategory(id: string, name: string): Promise<ICategory | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID");
    }
    const exists = await Category.findOne({ name: name.trim(), _id: { $ne: id } });
    if (exists) {
      throw new Error("Another category with this name already exists");
    }
    return Category.findByIdAndUpdate(
      id,
      { name, updatedAt: new Date() },
      { new: true }
    );
  }


   async deleteCategory(id: string): Promise<ICategory | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID");
    }
    return Category.findByIdAndDelete(id);
  }
}


export const categoryService = new CategoryService();
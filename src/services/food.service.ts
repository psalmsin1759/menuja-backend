import { Food, IFood } from "../models/food.model";
import { Types } from "mongoose";
import path from "path";
import fs from "fs";

export class FoodService {
  private publicFolder = path.join(__dirname, "../../uploads/foods");

  private savePhoto(file?: Express.Multer.File): string | undefined {
    if (!file) return undefined;

    if (!fs.existsSync(this.publicFolder)) {
      fs.mkdirSync(this.publicFolder, { recursive: true });
    }

    const fileExt = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, fileExt);
    const fileName = `${Date.now()}-${baseName}${fileExt}`;
    const destPath = path.join(this.publicFolder, fileName);

    fs.renameSync(file.path, destPath);

    return `/uploads/foods/${fileName}`;
  }

  async createFood(
    data: Partial<IFood> & { category: string },
    file?: Express.Multer.File
  ): Promise<IFood> {
    if (!Types.ObjectId.isValid(data.category)) {
      throw new Error("Invalid category ID");
    }

    const photoUrl = this.savePhoto(file);

    const food = new Food({
      ...data,
      category: new Types.ObjectId(data.category),
      photo: photoUrl,
    });

    return food.save();
  }

  async getAllFoods(): Promise<IFood[]> {
    return Food.find().populate("category", "name").sort({ createdAt: -1 });
  }

  async getFoodById(id: string): Promise<IFood | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid food ID");
    }
    return Food.findById(id).populate("category", "name");
  }

  async getFoodsByCategory(categoryId: string): Promise<IFood[]> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new Error("Invalid category ID");
    }
    return Food.find({ category: categoryId }).populate("category").exec();
  }

   async updateFood(
    id: string,
    data: Partial<IFood>,
    file?: Express.Multer.File
  ): Promise<IFood | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid food ID");
    }

    const food = await Food.findById(id);
    if (!food) throw new Error("Food not found");

    const photoUrl = this.savePhoto(file);
    if (photoUrl) {
      if (food.photo) {
        const oldPhotoPath = path.join(__dirname, "../../", food.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      data.photo = photoUrl;
    }

    return Food.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFood(id: string): Promise<IFood | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid food ID");
    }

    const food = await Food.findById(id);
    if (!food) return null;

   
    if (food.photo) {
      const photoPath = path.join(__dirname, "../../", food.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    return Food.findByIdAndDelete(id);
  }
}

export const foodService = new FoodService();

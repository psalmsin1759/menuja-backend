import { Admin, IAdmin } from "../models/admin.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

export class AdminService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "changeme";
  }

 
  async createAdmin(data: Partial<IAdmin>): Promise<IAdmin> {
    const existingAdmin = await Admin.findOne({ email: data.email });
    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }
    const admin = new Admin(data);
    return admin.save();
  }


  async login(email: string, password: string): Promise<{ token: string; admin: IAdmin }> {
    const admin = await Admin.findOne({ email });
    if (!admin) throw new Error("Invalid email or password");

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      this.jwtSecret,
      { expiresIn: "7d" }
    );

    return { token, admin };
  }


  async updateAdmin(adminId: string, updates: Partial<IAdmin>): Promise<IAdmin | null> {
    if ("password" in updates) delete updates.password;
    return Admin.findByIdAndUpdate(adminId, updates, { new: true });
  }


  async changePassword(adminId: string, oldPassword: string, newPassword: string): Promise<void> {
    const admin = await Admin.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) throw new Error("Old password is incorrect");

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
  }

  async deleteAdmin(adminId: string) {
    if (!Types.ObjectId.isValid(adminId)) throw new Error("Invalid admin ID");
    const deleted = await Admin.findByIdAndDelete(adminId);
    if (!deleted) throw new Error("Admin not found");
    return deleted;
  }

  async getAllAdmins(): Promise<IAdmin[]> {
    return Admin.find().select("-password");
  }
}


export const adminService = new AdminService()
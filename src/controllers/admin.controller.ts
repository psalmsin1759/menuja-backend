import { Request, Response } from "express";
import { adminService } from "../services/admin.service";

export class AdminController {
  async createAdmin(req: Request, res: Response) {
    try {
      const admin = await adminService.createAdmin(req.body);
      res.status(201).json(admin);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token, admin } = await adminService.login(req.body.email, req.body.password);
      res.status(200).json({ token, admin });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateAdmin(req: Request, res: Response) {
    try {
      const updated = await adminService.updateAdmin(req.params.id!, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      await adminService.changePassword(req.params.id!, req.body.oldPassword, req.body.newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteAdmin(req: Request, res: Response) {
    try {
      const deleted = await adminService.deleteAdmin(req.params.id!);
      res.status(200).json(deleted);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllAdmins(req: Request, res: Response) {
    try {
      const admins = await adminService.getAllAdmins();
      res.status(200).json(admins);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const adminController = new AdminController();

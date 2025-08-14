import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { validate } from "../middlewares/validate.middleware";
import { 
  createAdminSchema, 
  loginSchema, 
  updateAdminSchema, 
  changePasswordSchema 
} from "../validators/admin.validator";

const router = Router();


router.post("/", validate(createAdminSchema), adminController.createAdmin.bind(adminController));


router.post("/login", validate(loginSchema), adminController.login.bind(adminController));


router.get("/", adminController.getAllAdmins.bind(adminController));


router.put("/:id", validate(updateAdminSchema), adminController.updateAdmin.bind(adminController));


router.put("/:id/change-password", validate(changePasswordSchema), adminController.changePassword.bind(adminController));


router.delete("/:id", adminController.deleteAdmin.bind(adminController));

export default router;

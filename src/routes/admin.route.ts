import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { validate } from "../middlewares/validate.middleware";
import { 
  createAdminSchema, 
  loginSchema, 
  updateAdminSchema, 
  changePasswordSchema 
} from "../validators/admin.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const adminRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminInput'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Validation error
 */
adminRouter.post("/", validate(createAdminSchema), adminController.createAdmin.bind(adminController));

/**
 * @swagger
 * /admins/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@menuja.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful, returns token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
adminRouter.post("/login", validate(loginSchema), adminController.login.bind(adminController));

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 */
adminRouter.get("/", adminController.getAllAdmins.bind(adminController));

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update an admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminInput'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found
 */
adminRouter.put("/:id", authMiddleware, validate(updateAdminSchema), adminController.updateAdmin.bind(adminController));

/**
 * @swagger
 * /admins/{id}/change-password:
 *   put:
 *     summary: Change admin password
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: oldpass123
 *               newPassword:
 *                 type: string
 *                 example: newpass456
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid password
 *       404:
 *         description: Admin not found
 */
adminRouter.put("/:id/change-password", authMiddleware, validate(changePasswordSchema), adminController.changePassword.bind(adminController));

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 */
adminRouter.delete("/:id", adminController.deleteAdmin.bind(adminController));


export default adminRouter;

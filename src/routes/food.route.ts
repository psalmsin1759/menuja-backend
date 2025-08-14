import { Router } from "express";
import multer from "multer";
import { foodController } from "../controllers/food.controller";
import { validateFood } from "../validators/food.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const foodRouter = Router();
const upload = multer({ dest: "uploads/foods" });

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: API for managing foods
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
 * /foods:
 *   post:
 *     summary: Create a new food item
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FoodInput'
 *     responses:
 *       201:
 *         description: Food created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       400:
 *         description: Validation error
 */
foodRouter.post("/", upload.single("photo"), authMiddleware, validateFood, foodController.create);

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Get all foods
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */
foodRouter.get("/", authMiddleware, foodController.getAll);

/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Get a food by ID
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The food ID
 *     responses:
 *       200:
 *         description: Food found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 */
foodRouter.get("/:id", authMiddleware, foodController.getById);

/**
 * @swagger
 * /foods/{id}:
 *   put:
 *     summary: Update a food item
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The food ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FoodInput'
 *     responses:
 *       200:
 *         description: Food updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 */
foodRouter.put("/:id", upload.single("photo"), authMiddleware, validateFood, foodController.update);

/**
 * @swagger
 * /foods/{id}:
 *   delete:
 *     summary: Delete a food item
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The food ID
 *     responses:
 *       200:
 *         description: Food deleted successfully
 *       404:
 *         description: Food not found
 */
foodRouter.delete("/:id", authMiddleware, foodController.delete);

export default foodRouter;

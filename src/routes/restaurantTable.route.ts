import { Router } from "express";
import { restaurantTableController } from "../controllers/restaurantTable.controller";
import { validate } from "../middlewares/validate.middleware";
import { createRestaurantTableSchema, updateRestaurantTableSchema } from "../validators/restaurantTable.validator";

const tableRouter = Router();

/**
 * @swagger
 * tags:
 *   name: RestaurantTable
 *   description: Restaurant table management
 */

/**
 * @swagger
 * /tables:
 *   post:
 *     summary: Create a new restaurant table
 *     tags: [RestaurantTable]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantTableInput'
 *     responses:
 *       201:
 *         description: Table created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantTable'
 *       400:
 *         description: Invalid request
 */
tableRouter.post("/", validate(createRestaurantTableSchema), restaurantTableController.createTable);

/**
 * @swagger
 * /tables:
 *   get:
 *     summary: Get all restaurant tables
 *     tags: [RestaurantTable]
 *     responses:
 *       200:
 *         description: List of tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RestaurantTable'
 */
tableRouter.get("/", restaurantTableController.getAllTables);

/**
 * @swagger
 * /tables/{id}:
 *   get:
 *     summary: Get table by ID
 *     tags: [RestaurantTable]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Table ID
 *     responses:
 *       200:
 *         description: Table details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantTable'
 *       404:
 *         description: Table not found
 */
tableRouter.get("/:id", restaurantTableController.getTableById);

/**
 * @swagger
 * /tables/{id}:
 *   put:
 *     summary: Update a restaurant table
 *     tags: [RestaurantTable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Table ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantTableInput'
 *     responses:
 *       200:
 *         description: Table updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantTable'
 *       404:
 *         description: Table not found
 */
tableRouter.put("/:id", validate(updateRestaurantTableSchema), restaurantTableController.updateTable);

/**
 * @swagger
 * /tables/{id}:
 *   delete:
 *     summary: Delete a restaurant table
 *     tags: [RestaurantTable]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Table ID
 *     responses:
 *       200:
 *         description: Table deleted successfully
 *       404:
 *         description: Table not found
 */
tableRouter.delete("/:id", restaurantTableController.deleteTable);

export default tableRouter;

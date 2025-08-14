import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createOrderSchema,
  updateOrderSchema,
  addOrderItemSchema,
  updateOrderItemSchema
} from "../validators/order.validator";

const orderRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order with items
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
orderRouter.post("/",  validate(createOrderSchema), orderController.createOrder.bind(orderController));

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
orderRouter.get("/", orderController.getAllOrders.bind(orderController));

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
orderRouter.get("/:id", orderController.getOrderById.bind(orderController));

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 */
orderRouter.put("/:id", validate(updateOrderSchema), orderController.updateOrder.bind(orderController));

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter.delete("/:id", orderController.deleteOrder.bind(orderController));

/**
 * @swagger
 * /orders/{orderId}/items:
 *   post:
 *     summary: Add an item to an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter.post("/:orderId/items", validate(addOrderItemSchema), orderController.addOrderItem.bind(orderController));

/**
 * @swagger
 * /orders/items/{detailId}:
 *   put:
 *     summary: Update an order item
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter.put("/items/:detailId", validate(updateOrderItemSchema), orderController.updateOrderItem.bind(orderController));

/**
 * @swagger
 * /orders/items/{detailId}:
 *   delete:
 *     summary: Delete an order item
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter.delete("/items/:detailId", orderController.deleteOrderItem.bind(orderController));

/**
 * @swagger
 * /orders/{orderId}/details:
 *   get:
 *     summary: Get all items for an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter.get("/:orderId/details", orderController.getOrderDetails.bind(orderController));



/**
 * @swagger
 * /orders/count:
 *   get:
 *     summary: Get total number of orders
 *     tags: [Orders Analytics]
 *     responses:
 *       200:
 *         description: Total number of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               example: 120
 *       500:
 *         description: Server error
 */
orderRouter.get("/count", orderController.getOrderCount);

/**
 * @swagger
 * /orders/revenue:
 *   get:
 *     summary: Get total revenue from all orders
 *     tags: [Orders Analytics]
 *     responses:
 *       200:
 *         description: Total revenue
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               example: 250000
 *       500:
 *         description: Server error
 */
orderRouter.get("/revenue", orderController.getTotalRevenue);

/**
 * @swagger
 * /orders/most-sold-foods:
 *   get:
 *     summary: Get top 6 most sold foods with quantity
 *     tags: [Orders Analytics]
 *     responses:
 *       200:
 *         description: List of most sold foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   food:
 *                     type: string
 *                     example: Jollof Rice
 *                   count:
 *                     type: number
 *                     example: 120
 *       500:
 *         description: Server error
 */
orderRouter.get("/most-sold-foods", orderController.getMostSoldFoods);

/**
 * @swagger
 * /orders/monthly-revenue:
 *   get:
 *     summary: Get revenue per month for graphing
 *     tags: [Orders Analytics]
 *     responses:
 *       200:
 *         description: Revenue grouped by month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     example: Jan
 *                   revenue:
 *                     type: number
 *                     example: 50000
 *       500:
 *         description: Server error
 */
orderRouter.get("/monthly-revenue", orderController.getMonthlyRevenue);

export default orderRouter;

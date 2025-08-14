import express, { Request, Response, NextFunction } from "express";
import { config } from "./config";
import { createServer } from "http";
import { initSocket } from "./utils/socket";
import { connectDB } from "./utils/db";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';
import adminRouter from "./routes/admin.route";
import categoryRouter from "./routes/category.route";
import foodRouter from "./routes/food.route";
import orderRouter from "./routes/order.route";
import paymentRouter from "./routes/payment.route";
import qrRouter from "./routes/qrcodescan.route";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/admins", adminRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/foods", foodRouter)
app.use("/api/orders", orderRouter)
app.use("/api/payments", paymentRouter)
app.use("/api/qrcodescans", qrRouter)

connectDB().catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1); 
});

initSocket(httpServer);

app.get("/", (req: Request, res: Response) => {
  res.send("Server running...");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      error: "Something went wrong",
      message: config.env === "development" ? err.message : undefined,
    });
  }
);

httpServer.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
  httpServer.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  httpServer.close(() => process.exit(1));
});

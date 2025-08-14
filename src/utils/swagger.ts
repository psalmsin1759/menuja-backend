import swaggerJSDoc from "swagger-jsdoc";
import { config } from "../config";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Menuja API",
      version: "1.0.0",
      description: "API documentation for Menuja",
    },
    servers: [
      {
        url: `${config.host}:${config.port}/api`,
      },
    ],
    components: {
      schemas: {
        // Admin Schema
        Admin: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c50000f2c27b6b8e2f9999" },
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            email: { type: "string", example: "admin@menuja.com" },
            role: {
              type: "string",
              enum: ["owner", "admin"],
              example: "admin",
            },
            isActive: { type: "boolean", example: true },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-02T00:00:00.000Z",
            },
          },
        },
        AdminInput: {
          type: "object",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            email: { type: "string", example: "admin@menuja.com" },
            password: { type: "string", example: "secret123" },
            role: {
              type: "string",
              enum: ["owner", "admin"],
              example: "admin",
            },
          },
        },

        // Inside components.schemas in swaggerSpec
        Category: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c60000f2c27b6b8e2faaaa" },
            name: { type: "string", example: "Main Dish" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-02T00:00:00.000Z",
            },
          },
        },
        CategoryInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Main Dish" },
          },
        },

        // Food Schema
        Food: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c45b24f2c27b6b8e2f1234" },
            name: { type: "string", example: "Jollof Rice" },
            description: {
              type: "string",
              example: "Spicy Nigerian Jollof rice with chicken",
            },
            photo: { type: "string", format: "binary", example: "jollof.jpg" },
            price: { type: "number", example: 2500 },
            available: { type: "boolean", example: true },
            feature: { type: "boolean", example: false },
            category: { type: "string", example: "66c45d77f2c27b6b8e2f5678" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },

        FoodInput: {
          type: "object",
          required: ["name", "price", "category"],
          properties: {
            name: { type: "string", example: "Jollof Rice" },
            description: {
              type: "string",
              example: "Spicy Nigerian Jollof rice with chicken",
            },
            photo: { type: "string", format: "binary" },
            price: { type: "number", example: 2500 },
            available: { type: "boolean", example: true },
            feature: { type: "boolean", example: false },
            category: { type: "string", example: "66c45d77f2c27b6b8e2f5678" },
          },
        },

        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c70000f2c27b6b8e2fbbbb" },
            orderId: { type: "string", example: "ORD-1001" },
            payment_type: { type: "string", example: "cash" },
            amount: { type: "number", example: 5000 },
            table: { type: "string", example: "Table 5" },
            payment_status: {
              type: "string",
              enum: ["paid", "not paid"],
              example: "not paid",
            },
            order_status: {
              type: "string",
              enum: ["pending", "completed", "cancel"],
              example: "pending",
            },
            customerName: { type: "string", example: "Jane Doe" },
            customerEmail: { type: "string", example: "jane@example.com" },
            admin: { type: "string", example: "66c50000f2c27b6b8e2f9999" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-02T00:00:00.000Z",
            },
          },
        },
        OrderInput: {
          type: "object",
          required: ["orderId", "payment_type", "amount"],
          properties: {
            orderId: { type: "string", example: "ORD-1001" },
            payment_type: { type: "string", example: "cash" },
            amount: { type: "number", example: 5000 },
            table: { type: "string", example: "Table 5" },
            payment_status: {
              type: "string",
              enum: ["paid", "not paid"],
              example: "not paid",
            },
            order_status: {
              type: "string",
              enum: ["pending", "completed", "cancel"],
              example: "pending",
            },
            customerName: { type: "string", example: "Jane Doe" },
            customerEmail: { type: "string", example: "jane@example.com" },
            admin: { type: "string", example: "66c50000f2c27b6b8e2f9999" },
          },
        },

        // =====================
        // OrderDetails Schema
        // =====================
        OrderDetails: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c71111f2c27b6b8e2fcccc" },
            order: { type: "string", example: "66c70000f2c27b6b8e2fbbbb" },
            food: { type: "string", example: "66c45b24f2c27b6b8e2f1234" },
            quantity: { type: "number", example: 2 },
            price: { type: "number", example: 2500 },
            total: { type: "number", example: 5000 },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-02T00:00:00.000Z",
            },
          },
        },
        OrderDetailsInput: {
          type: "object",
          required: ["order", "food", "quantity", "price"],
          properties: {
            order: { type: "string", example: "66c70000f2c27b6b8e2fbbbb" },
            food: { type: "string", example: "66c45b24f2c27b6b8e2f1234" },
            quantity: { type: "number", example: 2 },
            price: { type: "number", example: 2500 },
          },
        },

        // Restaurant Table Schema
        RestaurantTable: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c45d77f2c27b6b8e2f5678" },
            name: { type: "string", example: "Table 1" },
            qrCodePath: {
              type: "string",
              example: "/uploads/qrcodes/table1.png",
            },
            url: { type: "string", example: "https://restaurant.com/table/1" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },
        RestaurantTableInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Table 1" },
            qrCodePath: {
              type: "string",
              example: "/uploads/qrcodes/table1.png",
            },
            url: { type: "string", example: "https://restaurant.com/table/1" },
          },
        },

        // QR Code Scan Schema
        QrCodeScan: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c46100f2c27b6b8e2f6789" },
            tableId: { type: "string", example: "66c45d77f2c27b6b8e2f5678" },
            scannedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T14:30:00.000Z",
            },
            scannedByIP: { type: "string", example: "192.168.1.15" },
            userAgent: {
              type: "string",
              example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T14:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T14:30:00.000Z",
            },
          },
        },
        QrCodeScanInput: {
          type: "object",
          required: ["tableId"],
          properties: {
            tableId: { type: "string", example: "66c45d77f2c27b6b8e2f5678" },
            scannedByIP: { type: "string", example: "192.168.1.15" },
            userAgent: {
              type: "string",
              example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

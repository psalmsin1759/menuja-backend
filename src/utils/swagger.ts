import swaggerJSDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

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
        url: `${HOST}/api`,
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
            phone: { type: "string", example: "+2348012345678" },
            role: { type: "string", enum: ["owner", "admin"], example: "admin" },
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
            phone: { type: "string", example: "+2348012345678" },
            role: { type: "string", enum: ["owner", "admin"], example: "admin" },
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
            price: { type: "number", example: 2500 },
            imageUrl: {
              type: "string",
              example: "https://example.com/images/jollof.jpg",
            },
            category: { type: "string", example: "Main Dish" },
            isAvailable: { type: "boolean", example: true },
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
          required: ["name", "price"],
          properties: {
            name: { type: "string", example: "Jollof Rice" },
            description: {
              type: "string",
              example: "Spicy Nigerian Jollof rice with chicken",
            },
            price: { type: "number", example: 2500 },
            imageUrl: {
              type: "string",
              example: "https://example.com/images/jollof.jpg",
            },
            category: { type: "string", example: "Main Dish" },
            isAvailable: { type: "boolean", example: true },
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

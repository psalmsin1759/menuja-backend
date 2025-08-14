import Joi from "joi";

export const createOrderSchema = Joi.object({
  orderData: Joi.object({
    orderId: Joi.string().required(),
    payment_type: Joi.string().required(),
    amount: Joi.number().positive().required(),
    table: Joi.string().optional(),
    payment_status: Joi.string().valid("paid", "not paid").optional(),
    order_status: Joi.string().valid("pending", "completed", "cancel").optional(),
    customerName: Joi.string().optional().allow(null, ""),
    customerEmail: Joi.string().email().optional().allow(null, ""),
    admin: Joi.string().optional(),
  }).required(),
  orderItems: Joi.array()
    .items(
      Joi.object({
        foodId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

export const updateOrderSchema = Joi.object({
  payment_type: Joi.string().optional(),
  amount: Joi.number().positive().optional(),
  table: Joi.string().optional(),
  payment_status: Joi.string().valid("paid", "not paid").optional(),
  order_status: Joi.string().valid("pending", "completed", "cancel").optional(),
  customerName: Joi.string().optional().allow(null, ""),
  customerEmail: Joi.string().email().optional().allow(null, ""),
});

export const addOrderItemSchema = Joi.object({
  foodId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().min(0).required(),
});

export const updateOrderItemSchema = Joi.object({
  quantity: Joi.number().min(1).optional(),
  price: Joi.number().min(0).optional(),
});

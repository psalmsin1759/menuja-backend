
import Joi from "joi";

export const createPaymentSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Payment name must be a string",
      "string.empty": "Payment name is required",
      "string.min": "Payment name must be at least {#limit} characters",
      "string.max": "Payment name must not exceed {#limit} characters",
      "any.required": "Payment name is required",
    }),

  pubKey: Joi.string()
    .required()
    .messages({
      "string.base": "Public key must be a string",
      "string.empty": "Public key is required",
      "any.required": "Public key is required",
    }),

  secretKey: Joi.string()
    .required()
    .messages({
      "string.base": "Secret key must be a string",
      "string.empty": "Secret key is required",
      "any.required": "Secret key is required",
    }),

  active: Joi.boolean().default(true).messages({
    "boolean.base": "Active must be a boolean value",
  }),

  webhook: Joi.string().uri().allow("", null).messages({
    "string.base": "Webhook must be a string",
    "string.uri": "Webhook must be a valid URL",
  }),
});


export const updatePaymentSchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    "string.base": "Payment name must be a string",
    "string.min": "Payment name must be at least {#limit} characters",
    "string.max": "Payment name must not exceed {#limit} characters",
  }),

  pubKey: Joi.string().messages({
    "string.base": "Public key must be a string",
  }),

  secretKey: Joi.string().messages({
    "string.base": "Secret key must be a string",
  }),

  active: Joi.boolean().messages({
    "boolean.base": "Active must be a boolean value",
  }),

  webhook: Joi.string().uri().allow("", null).messages({
    "string.base": "Webhook must be a string",
    "string.uri": "Webhook must be a valid URL",
  }),
});

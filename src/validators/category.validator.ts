import Joi from "joi";

/**
 * Joi schema for creating/updating categories
 */
export const categorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.base": "Category name must be a string",
      "string.empty": "Category name is required",
      "string.min": "Category name must be at least 3 characters",
      "string.max": "Category name must not exceed 50 characters",
      "any.required": "Category name is required",
    }),
  description: Joi.string()
    .max(255)
    .allow("")
    .messages({
      "string.base": "Description must be a string",
      "string.max": "Description must not exceed 255 characters",
    }),
  isActive: Joi.boolean().default(true),
});

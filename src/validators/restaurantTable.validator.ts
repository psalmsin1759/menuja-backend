import Joi from "joi";

export const createRestaurantTableSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.base": "Table name must be a string",
      "string.empty": "Table name is required",
      "any.required": "Table name is required",
    }),
  qrCodePath: Joi.string().optional(),
  url: Joi.string().uri().optional().messages({
    "string.uri": "URL must be a valid URI",
  }),
});

export const updateRestaurantTableSchema = Joi.object({
  name: Joi.string().optional(),
  qrCodePath: Joi.string().optional(),
  url: Joi.string().uri().optional().messages({
    "string.uri": "URL must be a valid URI",
  }),
});

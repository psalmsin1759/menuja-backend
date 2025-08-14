import Joi from "joi";

export const createQrCodeScanSchema = Joi.object({
  tableId: Joi.string()
    .required()
    .messages({
      "string.base": "Table ID must be a string",
      "string.empty": "Table ID is required",
      "any.required": "Table ID is required",
    }),
});

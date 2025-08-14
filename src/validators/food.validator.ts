import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const foodSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().allow("").max(255),
  price: Joi.number().positive().required(),
  available: Joi.boolean().default(true),
  feature: Joi.boolean().default(false),
  category: Joi.string().required(), 
});

export function validateFood(req: Request, res: Response, next: NextFunction) {
  const data = {
    ...req.body,
    photo: req.file?.path,
  };

  const { error } = foodSchema.validate(data, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: "error",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
}

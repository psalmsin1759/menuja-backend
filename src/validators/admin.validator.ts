import Joi from "joi";

export const createAdminSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
  role: Joi.string().valid("superadmin", "admin").default("admin"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const updateAdminSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid("superadmin", "admin").optional(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

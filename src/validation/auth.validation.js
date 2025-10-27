import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().pattern(/^[0-9]{9,15}$/).required(),
  password: Joi.string().min(8).max(20).required(),
  role: Joi.string().valid("admin", "Customer", "DeliveryStaff").default("Customer")
}).options({ stripUnknown: true }); 

export const loginSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{9,15}$/).required(),
  password: Joi.string().required()
}).options({ stripUnknown: true });

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required()
}).options({ stripUnknown: true });

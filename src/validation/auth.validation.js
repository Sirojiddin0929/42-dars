import Joi from "joi";


export const loginValidate = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .messages({
      "string.min": "TOO SHORT PASSWORD",
      "string.max": "TOO LONG PASSWORD"
    })
});


export const registerValidate = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .trim()
    .required()
    .messages({
      "string.min": "TOO SHORT PASSWORD",
      "string.max": "TOO LONG PASSWORD"
    }),
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "Name must contain only letters and spaces",
      "string.min": "Name too short",
      "string.max": "Name too long"
    }),
  phone: Joi.string()
    .pattern(/^\+\d{10,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid phone number"
    }),
  vehicle_number: Joi.string()
    .min(3)
    .max(10)
    .trim()
    .optional()
    .messages({
      "string.min": "Vehicle Number Too short",
      "string.max": "Vehicle Number Too long"
    }),
  district_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid district ID"
    }),
  role: Joi.string().valid("staff").optional()
});

export const verifyValidate = Joi.object({
  email: Joi.string().email().required(),
  verifyOtp: Joi.string().required()
});



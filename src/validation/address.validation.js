import Joi from 'joi';

export const addressschema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    address: Joi.string().min(6).max(25).required(),
    location: Joi.string().min(4).max(15).required(),
    customer_id: Joi.string().required(),
    district_id: Joi.string().required(),
});

export const addresschemaUpdate = Joi.object({
    name: Joi.string().min(2).max(20).optional(),
    address: Joi.string().min(6).max(25).optional(),
    location: Joi.string().min(4).max(15).optional(),
    customer_id: Joi.string().optional(),
    district_id: Joi.string().optional(),
});
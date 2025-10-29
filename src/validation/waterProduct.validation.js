import Joi from 'joi';

export const waterProschema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    volume_liters: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
});

export const waterProschemaUpdate = Joi.object({
    name: Joi.string().min(2).max(20).optional(),
    volume_litr: Joi.number().min(0).optional(),
    price: Joi.number().min(0).optional(),
});
import Joi from 'joi';

export const districtschema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
});

export const districtschemaUpdate = Joi.object({
    name: Joi.string().min(6).max(20).optional(),
});
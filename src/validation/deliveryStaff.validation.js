import Joi from 'joi';

export const staffSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    phone: Joi.number().required(),
    vehicle_number: Joi.number().required(),
    district_id: Joi.string().required(),
});

export const staffSchemaUpdate = Joi.object({
    name: Joi.string().min(2).max(20).optional(),
    phone: Joi.number().optional(),
    vehicle_number: Joi.number().optional(),
    district_id: Joi.string().optional(),
});
import Joi from 'joi';

export const customerschema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    phone: Joi.number().required(),
});

export const customerschemaUpdate = Joi.object({
    name: Joi.string().min(2).max(20).optional(),
    phone: Joi.number().min(4).max(15).optional(),
});

import Joi from 'joi';

export const paymentSchema = Joi.object({
    order_id: Joi.string().required(),
    amount: Joi.number().required(),
    payment_date: Joi.date().required(),
    method: Joi.string().valid('cash', 'card', 'online').required(),
});

export const paymentSchemaUpdate = Joi.object({
    order_id: Joi.string().optional(),
    amount: Joi.number().optional(),
    payment_date: Joi.date().optional(),
    method: Joi.string().valid('cash', 'card', 'online').optional(),
});
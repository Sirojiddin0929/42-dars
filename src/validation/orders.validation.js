import Joi from 'joi';

export const ordersSchema = Joi.object({
    customer_id: Joi.string().required(),
    delivery_staff_id: Joi.string().required(),
    order_date: Joi.date().required(),
    status: Joi.string().valid('pending', 'delivered', 'cancelled').required(),
});

export const ordersSchemaUpdate = Joi.object({
    customer_id: Joi.string().optional(),
    delivery_staff_id: Joi.string().optional(),
    order_date: Joi.date().optional(),
    status: Joi.string().valid('pending', 'delivered', 'cancelled').optional(),
});
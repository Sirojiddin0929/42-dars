import Joi from 'joi';

export const order_itemsSchema = Joi.object({
    order_id: Joi.string().required(),
    product_id: Joi.string().required(),
    quantity: Joi.number().required(),
    total_price: Joi.number().required(),
});

export const order_itemsSchemaUpdate = Joi.object({
    order_id: Joi.string().optional(),
    product_id: Joi.string().optional(),
    quantity: Joi.number().optional(),
    total_price: Joi.number().optional(),
});
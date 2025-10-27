import { orderItem } from "../models/orderItem.model.js";

export const createOrderItem = async (req, res, next) => {
  try {
    const item = await orderItem.create(req.body);
    res.status(201).json({ message: "Order item created", item });
  } catch (err) {
    next(err);
  }
};

export const getOrderItems = async (req, res, next) => {
  try {
    const items = await orderItem.find()
      .populate("order", "status order_date")
      .populate("product", "name price volume_liters");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getOrderItemById = async (req, res, next) => {
  try {
    const item = await orderItem.findById(req.params.id)
      .populate("order", "status order_date")
      .populate("product", "name price volume_liters");
    if (!item) return res.status(404).json({ message: "Order item not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const updateOrderItem = async (req, res, next) => {
  try {
    const item = await orderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Order item not found" });
    res.json({ message: "Order item updated", item });
  } catch (err) {
    next(err);
  }
};

export const deleteOrderItem = async (req, res, next) => {
  try {
    const item = await orderItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Order item not found" });
    res.json({ message: "Order item deleted" });
  } catch (err) {
    next(err);
  }
};

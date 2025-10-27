import { Order } from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name phone")
      .populate("delivery_staff", "name phone")
      .sort({ order_date: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name phone")
      .populate("delivery_staff", "name phone");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order updated", order });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    next(err);
  }
};

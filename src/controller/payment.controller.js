import { Payment } from "../models/payment.model.js";

export const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ message: "Payment created", payment });
  } catch (err) {
    next(err);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate("order", "status order_date")
      .sort({ payment_date: -1 });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("order", "status order_date");
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment updated", payment });
  } catch (err) {
    next(err);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    next(err);
  }
};

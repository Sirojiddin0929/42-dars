import { DeliveryStaff } from "../models/deliveryStaff.model.js";

export const createDeliveryStaff = async (req, res, next) => {
  try {
    const staff = await DeliveryStaff.create(req.body);
    res.status(201).json({ message: "Delivery staff created", staff });
  } catch (err) {
    next(err);
  }
};

export const getDeliveryStaff = async (req, res, next) => {
  try {
    const staff = await DeliveryStaff.find().populate("district", "name");
    res.json(staff);
  } catch (err) {
    next(err);
  }
};

export const getDeliveryStaffById = async (req, res, next) => {
  try {
    const staff = await DeliveryStaff.findById(req.params.id).populate("district", "name");
    if (!staff) return res.status(404).json({ message: "Delivery staff not found" });
    res.json(staff);
  } catch (err) {
    next(err);
  }
};

export const updateDeliveryStaff = async (req, res, next) => {
  try {
    const staff = await DeliveryStaff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staff) return res.status(404).json({ message: "Delivery staff not found" });
    res.json({ message: "Delivery staff updated", staff });
  } catch (err) {
    next(err);
  }
};

export const deleteDeliveryStaff = async (req, res, next) => {
  try {
    const staff = await DeliveryStaff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: "Delivery staff not found" });
    res.json({ message: "Delivery staff deleted" });
  } catch (err) {
    next(err);
  }
};

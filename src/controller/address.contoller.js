import { Address } from "../models/address.model.js";

export const createAddress = async (req, res, next) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json({ message: "Address created", address });
  } catch (err) {
    next(err);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find()
      .populate("customerId", "name phone")
      .populate("district", "name");
    res.json(addresses);
  } catch (err) {
    next(err);
  }
};

export const getAddressById = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.id)
      .populate("customerId", "name phone")
      .populate("district", "name");
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json(address);
  } catch (err) {
    next(err);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json({ message: "Address updated", address });
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json({ message: "Address deleted" });
  } catch (err) {
    next(err);
  }
};

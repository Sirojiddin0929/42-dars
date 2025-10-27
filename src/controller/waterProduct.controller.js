import { waterProduct } from "../models/waterProduct.model.js";

export const createWaterProduct = async (req, res, next) => {
  try {
    const product = await waterProduct.create(req.body);
    res.status(201).json({ message: "Water product created", product });
  } catch (err) {
    next(err);
  }
};

export const getWaterProducts = async (req, res, next) => {
  try {
    const products = await waterProduct.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getWaterProductById = async (req, res, next) => {
  try {
    const product = await waterProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Water product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updateWaterProduct = async (req, res, next) => {
  try {
    const product = await waterProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Water product not found" });
    res.json({ message: "Water product updated", product });
  } catch (err) {
    next(err);
  }
};

export const deleteWaterProduct = async (req, res, next) => {
  try {
    const product = await waterProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Water product not found" });
    res.json({ message: "Water product deleted" });
  } catch (err) {
    next(err);
  }
};

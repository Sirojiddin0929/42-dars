import { District } from "../models/district.model.js";

export const createDistrict = async (req, res, next) => {
  try {
    const district = await District.create(req.body);
    res.status(201).json({ message: "District created", district });
  } catch (err) {
    next(err);
  }
};

export const getDistricts = async (req, res, next) => {
  try {
    const districts = await District.find();
    res.json(districts);
  } catch (err) {
    next(err);
  }
};

export const getDistrictById = async (req, res, next) => {
  try {
    const district = await District.findById(req.params.id);
    if (!district) return res.status(404).json({ message: "District not found" });
    res.json(district);
  } catch (err) {
    next(err);
  }
};

export const updateDistrict = async (req, res, next) => {
  try {
    const district = await District.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!district) return res.status(404).json({ message: "District not found" });
    res.json({ message: "District updated", district });
  } catch (err) {
    next(err);
  }
};

export const deleteDistrict = async (req, res, next) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) return res.status(404).json({ message: "District not found" });
    res.json({ message: "District deleted" });
  } catch (err) {
    next(err);
  }
};

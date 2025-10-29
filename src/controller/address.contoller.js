import { Address } from "../models/address.model.js";

export const createAddress = async (req, res, next) => {
  try {
    const body = req.validatedData
    const address = await Address.create(body);
    return res.status(201).json({ message: "Address is created", address });
  } catch (err) {
    next(err);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const page=parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const offset = (page-1)*limit
    const areas = Object.keys(Address.schema.paths).filter((i) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(i))
    const query = search?{$or: areas.map((i) => ({[i]: { $regex: search, $options: 'i' },})),}: {}
    const [data, total] = await Promise.all([Address.find(query).skip(offset).limit(limit).sort({ createdAt: -1 }),Address.countDocuments(query),]);
    return res.status(200).json({message:"OK",data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getAddressById = async (req, res, next) => {
  try {
    const {id}=req.params
    const address = await Address.findById(id)
    if (!address) return res.status(404).json({ message: "Address is not found" });
    return res.status(200).json(address);
  } catch (err) {
    next(err);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const {id}=req.params
    const body=req.validatedData
    const address = await Address.findByIdAndUpdate(id,body, { new: true });
    if (!address) return res.status(404).json({ message: "Address is not found" });
    return res.status(200).json({ message: "Address is  updated", address });
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const {id}=req.params
    const address = await Address.findByIdAndDelete(id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    return res.json({ message: "Address is  deleted",address });
  } catch (err) {
    next(err);
  }
};

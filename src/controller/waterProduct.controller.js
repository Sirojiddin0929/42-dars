import { waterProduct } from "../models/waterProduct.model.js";

export const createWaterProduct = async (req, res, next) => {
  try {
    const body=req.validatedData
    const product = await waterProduct.create(body);
    return res.status(201).json({ message: "Water product created", product });
  } catch (err) {
    next(err);
  }
};

export const getWaterProducts = async (req, res, next) => {
  try {
    const page=parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const offset=(page-1)*limit
    const fields=Object.keys(waterProduct.schema.paths).filter((i)=> !['_id','__v','createdAt','updatedAt'].includes(i))
    const query=search?{$or:fields.map((i)=>({[i]:{$regex:search,$options:'i'}}))}:{}
    const [data,total]= await Promise.all([waterProduct.find(query).skip(offset).limit(limit).sort({createdAt:-1}),waterProduct.countDocuments(query)])
    return res.status(200).json({message:"OK",data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getWaterProductById = async (req, res, next) => {
  try {
    const {id}=req.params
    const product = await waterProduct.findById(id);
    if (!product) return res.status(404).json({ message: "Water product not found" });
    return res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updateWaterProduct = async (req, res, next) => {
  try {
    const {id}=req.params
    const body=req.validatedData
    const product = await waterProduct.findByIdAndUpdate(id,body, { new: true });
    if (!product) return res.status(404).json({ message: "Water product not found" });
    return res.json({ message: "Water product updated", product });
  } catch (err) {
    next(err);
  }
};

export const deleteWaterProduct = async (req, res, next) => {
  try {
    const {id}=req.params
    const product = await waterProduct.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Water product is  not found" });
    return res.json({ message: "Water product deleted" ,product});
  } catch (err) {
    next(err);
  }
};

import { Customer } from "../models/customer.model.js";
import { District } from "../models/district.model.js";

export const createDistrict = async (req, res, next) => {
  try {
    const body = req.validatedData
    const district = await District.create(body);
    return res.status(201).json({ message: "District created", district });
  } catch (err) {
    next(err);
  }
};

export const getDistricts = async (req, res, next) => {
  try {
    const page=parseInt(req.quary.page) || 1
    const limit = parseInt(req.quary.limit) || 10
    const search= req.query.search || ''
    const offset=(page-1)*limit
    const areas=Object.keys(District.schema.paths).filter((i)=> !['_id','__v','createdAt','updatedAt'].includes(i))
    const query=search?{$or:areas.map((i)=>({[i]:{$regex:search,$options:'i'}}))}:{}
    const [data,total]= await Promise.all([Customer.find(query).skip(offset).limit(limit).sort({createdAt:-1}),Customer.countDocuments(query)])
    return res.status(200).json({message: 'OK',data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getDistrictById = async (req, res, next) => {
  try {
    const {id}=req.params
    const district = await District.findById(id);
    if (!district) return res.status(404).json({ message: "District is  not found" });
    return res.json(district);
  } catch (err) {
    next(err);
  }
};

export const updateDistrict = async (req, res, next) => {
  try {
    const {id}=req.params
    const body=req.validatedData
    const district = await District.findByIdAndUpdate(id, body, { new: true });
    if (!district) return res.status(404).json({ message: "District is not found" });
    return res.json({ message: "District is updated", district });
  } catch (err) {
    next(err);
  }
};

export const deleteDistrict = async (req, res, next) => {
  try {
    const {id}=req.params
    const district = await District.findByIdAndDelete(id);
    if (!district) return res.status(404).json({ message: "District is not found" });
    return res.json({ message: "District is  deleted" });
  } catch(err){
    next(err);
  }
};

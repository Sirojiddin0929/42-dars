import { DeliveryStaff } from "../models/deliveryStaff.model.js";

export const createDeliveryStaff = async (req, res, next) => {
  try {
    const body=req.validatedData
    const staff = await DeliveryStaff.create(body);
    return res.status(201).json({ message: "DeliveryStaff is created", staff });
  } catch (err) {
    next(err);
  }
};

export const getDeliveryStaff = async (req, res, next) => {
  try {
    const page=parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const offset=(page-1)*limit
    const areas = Object.keys(DeliveryStaff.schema.paths).filter((i)=> !['_id','__v','createdAt','updatedAt'].includes(i))
    const query=search?{$or:areas.map((i)=>({[i]:{$regex:search, $options:'i'}}))}:{}
    const [data,total]= await Promise.all([DeliveryStaff.find(query).skip(offset).limit(limit).sort({createdAt:-1}),DeliveryStaff.countDocuments(query)])
    return res.status(200).json({message: "Greatness",data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getDeliveryStaffById = async (req, res, next) => {
  try {
    const {id}=req.params
    const staff = await DeliveryStaff.findById(id)
    if (!staff) return res.status(404).json({ message: "DeliveryStaff is not found" });
    return res.status(200).json(staff);
  }catch(err){
    next(err);
  }
};

export const updateDeliveryStaff = async (req, res, next) => {
  try {
    const {id}=req.params
    const body=req.validatedData
    const staff = await DeliveryStaff.findByIdAndUpdate(id,body, { new: true });
    if (!staff) return res.status(404).json({ message: "DeliveryStaff is not found" });
    return res.status(200).json({ message: "Delivery staff updated", staff });
  } catch (err) {
    next(err);
  }
};

export const deleteDeliveryStaff = async (req, res, next) => {
  try {
    const {id}=req.params
    const staff = await DeliveryStaff.findByIdAndDelete(id);
    if (!staff) return res.status(404).json({ message: "DeliveryStaff is not found" });
    return res.json({ message: "DeliveryStaff is  deleted" ,staff});
  } catch (err) {
    next(err);
  }
};

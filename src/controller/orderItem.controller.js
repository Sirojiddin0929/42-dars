import { orderItem } from "../models/orderItem.model.js";

export const createOrderItem = async (req, res, next) => {
  try {
    const body=req.validatedData
    const item = await orderItem.create(body);
    return res.status(201).json({ message: "Order is item created", item });
  } catch (err) {
    next(err);
  }
};

export const getOrderItems = async (req, res, next) => {
  try {
   const page=parseInt(req.query.page) || 1
   const limit = parseInt(req.query.limit) || 10
   const search= req.query.search || ''
   const offset=(page-1)*limit
   const areas=Object.keys(orderItem.schema.paths).filter((i)=> !['_id','__v','createdAt','updatedAt'].includes(i))
   const query=search?{$or:areas.map((i)=>({[i]:{$regex:search,$options:'i'}}))}:{}
   const [data,total]= await Promise.all([orderItem.find(query).skip(offset).limit(limit).sort({createdAt:-1}),orderItem.countDocuments(query)])
   return res.status(200).json({message:"OK",data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getOrderItemById = async (req, res, next) => {
  try {
    const {id}=req.params
    const item = await orderItem.findById(id)
    if (!item) return res.status(404).json({ message: "Order item not found" });
    return res.json(item);
  } catch (err) {
    next(err);
  }
};

export const updateOrderItem = async (req, res, next) => {
  try {
    const {id}=req.params
    const body=req.validatedData
    const item = await orderItem.findByIdAndUpdate(id, body, { new: true });
    if (!item) return res.status(404).json({ message: "Order item not found" });
    return res.json({ message: "Order item updated", item });
  } catch (err) {
    next(err);
  }
};

export const deleteOrderItem = async (req, res, next) => {
  try {
    const {id}=req.params
    const item = await orderItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Order item not found" });
    return res.json({ message: "Order item deleted" });
  } catch (err) {
    next(err);
  }
};

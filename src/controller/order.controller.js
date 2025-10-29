import { Order } from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const body=req.validatedData
    const order = await Order.create(body);
    return res.status(201).json({ message: "Order is created", order });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const page=parseInt(req.query.page) || 1
    const limit=parseInt(req.query.limit) || 10
    const search=req.query.search || ''
    const offset=(page-1)*limit
    const areas=Object.keys(Order.schema.paths).filter((i)=> !['_id','__v','createdAt','updatedAt'].includes(i))
    const query=search?{$or:areas.map((i)=>({[i]:{$regex:search,$options:'i'}}))}:{}
    const [data,total]= await Promise.all([Order.find(query).skip(offset).limit(limit).sort({createdAt:-1}),Order.countDocuments(query)])
    return res.status(200).json({message:"ok",data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const {id}=req.params
    const order = await Order.findById(id)
    if (!order) return res.status(404).json({ message: "Order is not found" });
    return res.json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const {id}=req.params
    const body=req.validatedData
    const order = await Order.findByIdAndUpdate(id,body, { new: true });
    if (!order) return res.status(404).json({ message: "Order is not found" });
    return res.json({ message: "Order updated", order });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const {id}=req.params
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order is not found" });
    return res.json({ message: "Order is deleted",order });
  } catch (err) {
    next(err);
  }
};

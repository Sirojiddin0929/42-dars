import { Payment } from "../models/payment.model.js";

export const createPayment = async (req, res, next) => {
  try {
    const body=req.validatedData
    const payment = await Payment.create(body);
    return res.status(201).json({ message: "Payment created", payment });
  } catch (err) {
    next(err);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const page=parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search= req.query.search || ''
    const offset=(page-1)*limit
    const areas=Object.keys(Payment.schema.paths).filter((i)=> !['_id','__v','createdAt','updatedAt'].includes(i))
    const query=search?{$or:areas.map((i)=>({[i]:{$regex:search,$options:'i'}}))}:{}
    const [data,total]= await Promise.all([Payment.find(query).skip(offset).limit(limit).sort({createdAt:-1}),Payment.countDocuments(query)])
    return res.status(200).json({message:"OK",data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const {id}=req.params
    const payment = await Payment.findById(id)
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    return res.json(payment);
  } catch (err) {
    next(err);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const {id}=req.params
    const body = req.validatedData
    const payment = await Payment.findByIdAndUpdate(id,body, { new: true });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    return res.json({ message: "Payment updated", payment });
  } catch (err) {
    next(err);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const {id}=req.params
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    return res.json({ message: "Payment deleted",payment });
  } catch (err) {
    next(err);
  }
};

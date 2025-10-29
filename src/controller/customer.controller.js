import { Customer } from "../models/customer.model.js";

export const createCustomer = async (req, res, next) => {
  try {
    const body=req.validatedData
    const data = await Customer.create(body)
    return res.status(201).json({message:`Customer is created OK`,data})
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const page=parseInt(req.query.page) || 1
    const limit =parseInt(req.query.limit) || 10
    const search= req.query.search || ''
    const offset=(page-1)*limit
    const areas=Object.keys(Customer.schema.paths).filter((i)=> !['_id','_v','createdAt','updateAt'].includes(i))
    const query=search?{$or: areas.map((i)=>({[i]:{$regex: search, $options:'i'}}))}:{}
    const [data,total]= await Promise.all([Customer.find(query).skip(offset).limit(limit).sort({createdAt:-1}),Customer.countDocuments(query)])
    return res.status(200).json({message:`OK`,data,total,page,limit})
  } catch (err) {
    next(err);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const {id}=req.params
    const data = await Customer.findOne(id)
    if(!data){
       return res.status(404).json({message:`Customer is not found with such Id`})
    }
    return res.status(200).json({message: "Customer is found OK",data})

    
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const {id}=req.params
    const body=req.validatedData
    const data = await Customer.findByIdAndUpdate(id,body,{new:true})
    if(!data){
      return res.status(404).json({message:'Customer is not found'})
    }
    return res.status(200).json({message:'Update is done ',data})
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const {id}=req.params
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) return res.status(404).json({ message: "Customer is  not found" });
    res.status(200).json({ message: "Customer deleted",customer });
  } catch (err) {
    next(err);
  }
};

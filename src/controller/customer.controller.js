import { Customer } from "../models/customer.model.js";

export const createCustomer = async (req, res, next) => {
  try {
    const {phone}=req.body
    if(req.user.role !=="admin"){
      return res.status(403).json({message:"Only Admin can add a new customer"})
    }
    const existing=await Customer.findOne({phone})
    if(existing) return res.status(400).json({message:"Such Customer is already exist"})
    const customer = await Customer.create(req.body);
    res.status(201).json({ message: "Customer created", customer });
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    if(req.user.role !=="admin"){
        return res.status(403).json("You are not allowed for this")
    }
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const {id}=req.params
    if(req.user.role !=="admin" && req.user.id !==id){
      return res.status(403).json({message:"You can only see your own profil"})
    }
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const {id}=req.params
    if(req.user.role !== "admin" && req.user.id !==id){
       return res.status(403).json({message:"You  are able to update only your own profil"})
    }
    const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer updated", customer });
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    if(req.user.role !== "admin"){
       return res.status(403).json({message: "Admin can delete customers but not customer"})
    }
    const {id}=req.params
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    next(err);
  }
};

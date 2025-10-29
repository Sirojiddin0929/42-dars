import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: { type: String },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  address: { type: String, required: true },
  location: { type: String,required:true },
  district_id: { type:mongoose.Schema.Types.ObjectId, ref: "District", required: true },
},{timestamps:true});

export const Address=mongoose.model("Address",addressSchema)

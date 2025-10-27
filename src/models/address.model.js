import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: { type: String },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  address: { type: String, required: true },
  location: { type: String },
  district: { type:mongoose.Schema.Types.ObjectId, ref: "District", required: true },
});

export const Address=mongoose.model("Address",addressSchema)

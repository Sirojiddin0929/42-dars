import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now() },
  method: { type: String, enum: ["cash", "card", "transfer"], required: true },
},{timestamps:true});

export const Payment=mongoose.model("Payment", paymentSchema);


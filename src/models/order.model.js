import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  delivery_staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryStaff", required: true },
  order_date: { type: Date, default: Date.now() },
  status: { type: String, enum: ["pending", "delivered", "cancelled"], default: "pending" },
},{timestamps:true});

export const Order=mongoose.model("Order", orderSchema);


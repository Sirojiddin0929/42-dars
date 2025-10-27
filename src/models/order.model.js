import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  delivery_staff: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryStaff", required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "delivered", "cancelled"], default: "pending" },
});

export const Order=mongoose.model("Order", orderSchema);


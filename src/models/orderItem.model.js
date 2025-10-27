import mongoose  from "mongoose";

const orderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "WaterProduct", required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true },
});

 export const orderItem=mongoose.model("OrderItem", orderItemSchema);


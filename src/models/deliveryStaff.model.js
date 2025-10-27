import mongoose from "mongoose";

const deliveryStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vehicle_number: { type: String },
  district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
});

export const DeliveryStaff=mongoose.model("DeliveryStaff", deliveryStaffSchema);



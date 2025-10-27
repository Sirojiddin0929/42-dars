import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["admin", "Customer", "DeliveryStaff"], 
      default: "Customer" 
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

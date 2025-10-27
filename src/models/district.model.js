import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const District=mongoose.model("District",districtSchema)


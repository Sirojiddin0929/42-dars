import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    otp:{type:String,trim:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"Customer"}
},{timestamps:true})

export const Otp=mongoose.model('Otp',otpSchema)
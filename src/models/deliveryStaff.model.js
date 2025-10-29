import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const deliveryStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vehicle_number: { type: String ,required:true},
  district_id: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  role:{type:String,enum:['DeliveryStaff'],default:'DeliveryStaff'}
},{timestamps:true});

deliveryStaffSchema.pre('save',async function (next) {
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password,10)
  next()
})

deliveryStaffSchema.pre('findOneAndUpdate',async function(next){
  const update=this.getUpdate()
  if(update.password){
    update.password = await bcrypt.hash(update.password,10)
  }
  next()
})

deliveryStaffSchema.methods.comparePassword = async function (deliveryStaffPassword) {
   const isValidPassword = await bcrypt.compare(deliveryStaffPassword,this.password)
   return isValidPassword

}

export const DeliveryStaff=mongoose.model("DeliveryStaff", deliveryStaffSchema);



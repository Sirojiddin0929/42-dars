import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['Customer'],default:'Customer'},
    isActive:{type:Boolean,default:false}
  },
  { timestamps: true }
);

customerSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next()
    this.password= await bcrypt.hash(this.password,10)
    next()
})

customerSchema.pre('findByIdAndUpdate',async function (next){
    if(!this.isModified('password')) return next()
    const update=this.getUpdate()
    if(update.password){
       update.password = await bcrypt.hash(update.password,10)
    }
    next()
})

customerSchema.methods.comparePassword=async function (customerPassword){
  const isValidPassword = await bcrypt.compare(customerPassword,this.password)
  return isValidPassword
}

export const Customer = mongoose.model("Customer", customerSchema);


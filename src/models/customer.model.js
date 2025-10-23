import { model,Schema } from "mongoose";

const customersSchema=new Schema({
    name:{type:String,required:true},
    phone:{type:String,required:true,unique:true}
},{timestamps:true})

const CustomerModel=model("customer",customersSchema)

export default CustomerModel
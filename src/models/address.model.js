import { model,Schema } from "mongoose";


const addressSchema=new Schema({
    name:{type:String,required:true},
    customerId:{type:Schema.Types.ObjectId,ref:"customer",required:true},
    address:{type:String,required:true},
    location:{type:String,required:true},
    districtId:{type:Schema.Types.ObjectId,ref:"region",required:true}

})

const AddressModel=model("address",addressSchema)
export default AddressModel
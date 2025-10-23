import { model,Schema } from "mongoose";


const deliverySchema=new Schema({
    name:{type:String,required:true},
    phone:{type:Number,required:true,unique:true},
    vehicleNumber:{type:Number,required:true,unique:true},
    districtId:{type:Schema.Types.ObjectId,ref:"region",required:true}

})

const DeliveryModel=model("delivery",deliverySchema)
export default DeliveryModel
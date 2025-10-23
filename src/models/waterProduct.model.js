import { model,Schema} from "mongoose";

const waterProductSchema=new Schema({
    name:{type:String,required:true},
    volume_liters:{type:Number,required:true},
    price:{type:Number,required:true}
},{timestamps:true})

const WaterProductModel=model("waterProduct",waterProductSchema)

export default WaterProductModel
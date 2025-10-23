import { model,Schema } from "mongoose";

const regionSchema=new Schema({
    name:{type: String,required:true}
},{timestamps:true})

const RegionModel=model("region",regionSchema)

export default RegionModel
import { model,Schema } from "mongoose";

const orderSchema=new Schema({
    customerId:{type:Schema.Types.ObjectId,ref:"customer",required:true},
    deliveryStaffId:{type:Schema.Types.ObjectId,ref:"delivery",required:true},
    order_date:{type:Date(),required:true},
    status:{type:Number}
    

})

const OrderModel=model("order",orderSchema)

export default OrderModel

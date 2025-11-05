import { Router } from "express";
import { addressRouter } from "./address.routes.js";
import { customerRouter } from "./customer.routes.js";
import { deliveryStaffRouter } from "./deliveryStaff.routes.js";
import { districtRouter } from "./district.routes.js";
import { orderItemRouter } from "./orderItem.routes.js";
import { orderRouter } from "./order.routes.js";
import { paymentRouter } from "./payment.routes.js";
import { waterProductRouter } from "./waterProduct.routes.js";

const MainRouter= Router()

MainRouter.use("/address",addressRouter)
MainRouter.use("/customer",customerRouter)
MainRouter.use("/deliveryStaff",deliveryStaffRouter)
MainRouter.use("/district",districtRouter)
MainRouter.use("/orderItem",orderItemRouter)
MainRouter.use("/order",orderRouter)
MainRouter.use("/payment",paymentRouter)
MainRouter.use("/waterProduct",waterProductRouter)

export default MainRouter

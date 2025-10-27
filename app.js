import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./src/config/db.js"
import  authRoutes from "./src/routes/auth.routes.js"
import { errorHandler } from "./src/middleware/errorHandler.js"
import customerRoutes from "./src/routes/customer.routes.js";
import districtRoutes from "./src/routes/district.routes.js";
import addressRoutes from "./src/routes/address.routes.js";
import deliveryStaffRoutes from "./src/routes/deliveryStaff.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import orderItemRoutes from "./src/routes/orderItem.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import waterProductRoutes from "./src/routes/waterProduct.routes.js";
dotenv.config()
const app=express()
app.use(cors())

app.use(express.json())

connectDB() 

app.use("/api/auth",authRoutes)
app.use("/api/customers", customerRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/delivery-staff", deliveryStaffRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", waterProductRoutes);
app.use(errorHandler)
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`))
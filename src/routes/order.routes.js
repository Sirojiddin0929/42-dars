import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controller/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { ordersSchema,ordersSchemaUpdate } from "../validation/orders.validation.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin","Customer","DeliveryStaff"),validate(ordersSchema), createOrder);
router.get("/",authGuard, getOrders);
router.get("/:id",authGuard, getOrderById);
router.put("/:id",authGuard,ownershipOrRole("admin","Customer","DeliveryStaff") ,validate(ordersSchemaUpdate),updateOrder);
router.delete("/:id",authGuard,ownershipOrRole("admin","Customer","DeliveryStaff"), deleteOrder);

export {router as orderRouter}

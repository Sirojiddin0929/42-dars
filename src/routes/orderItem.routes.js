import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem
} from "../controller/orderItem.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { order_itemsSchema,order_itemsSchemaUpdate } from "../validation/orderItems.validation.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin","Customer"),validate(order_itemsSchema), createOrderItem);
router.get("/",authGuard, getOrderItems);
router.get("/:id",authGuard, getOrderItemById);
router.put("/:id", authGuard,ownershipOrRole("admin","Customer") ,validate(order_itemsSchemaUpdate),updateOrderItem);
router.delete("/:id",authGuard,ownershipOrRole("admin","Customer") ,deleteOrderItem);

export {router as orderItemRouter}

import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";
import {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem
} from "../controller/orderItem.controller.js";

const router = express.Router();

router.post("/",authGuard,checkRole("admin","Customer"), createOrderItem);
router.get("/",authGuard, getOrderItems);
router.get("/:id",authGuard, getOrderItemById);
router.put("/:id", authGuard,checkRole("admin") ,updateOrderItem);
router.delete("/:id",authGuard,checkRole("admin") ,deleteOrderItem);

export default router;

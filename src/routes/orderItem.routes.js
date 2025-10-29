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

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin","Customer"), createOrderItem);
router.get("/",authGuard, getOrderItems);
router.get("/:id",authGuard, getOrderItemById);
router.put("/:id", authGuard,ownershipOrRole("admin") ,updateOrderItem);
router.delete("/:id",authGuard,ownershipOrRole("admin") ,deleteOrderItem);

export default router;

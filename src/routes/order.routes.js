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

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin","Customer"), createOrder);
router.get("/",authGuard, getOrders);
router.get("/:id",authGuard, getOrderById);
router.put("/:id",authGuard,ownershipOrRole("admin") ,updateOrder);
router.delete("/:id",authGuard,ownershipOrRole("admin"), deleteOrder);

export default router;

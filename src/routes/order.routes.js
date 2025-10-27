import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controller/order.controller.js";

const router = express.Router();

router.post("/",authGuard,checkRole("admin","Customer"), createOrder);
router.get("/",authGuard, getOrders);
router.get("/:id",authGuard, getOrderById);
router.put("/:id",authGuard,checkRole("admin") ,updateOrder);
router.delete("/:id",authGuard,checkRole("admin"), deleteOrder);

export default router;

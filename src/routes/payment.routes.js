import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/",authGuard,checkRole("admin","Customer"),createPayment);
router.get("/",authGuard,checkRole("admin","Customer") ,getPayments);
router.get("/:id",authGuard,checkRole("admin","Customer"), getPaymentById);
router.put("/:id", authGuard,checkRole("admin"), updatePayment);
router.delete("/:id", authGuard,checkRole("admin"),deletePayment);

export default router;

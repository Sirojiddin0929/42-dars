import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin","Customer"),createPayment);
router.get("/",authGuard,ownershipOrRole("admin","Customer") ,getPayments);
router.get("/:id",authGuard,ownershipOrRole("admin","Customer"), getPaymentById);
router.put("/:id", authGuard,ownershipOrRole("admin"), updatePayment);
router.delete("/:id", authGuard,ownershipOrRole("admin"),deletePayment);

export default router;

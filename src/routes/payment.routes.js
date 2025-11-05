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
import { validate } from "../middleware/validate.middleware.js";
import { paymentSchema,paymentSchemaUpdate } from "../validation/payments.validation.js";
const router = express.Router();


router.post("/",authGuard,ownershipOrRole("admin","Customer"),validate(paymentSchema),createPayment);
router.get("/",authGuard,ownershipOrRole("admin","Customer") ,getPayments);
router.get("/:id",authGuard,ownershipOrRole("admin","Customer"), getPaymentById);
router.put("/:id", authGuard,ownershipOrRole("admin","Customer"),validate(paymentSchemaUpdate), updatePayment);
router.delete("/:id", authGuard,ownershipOrRole("admin","Customer"),deletePayment);

export {router as paymentRouter}

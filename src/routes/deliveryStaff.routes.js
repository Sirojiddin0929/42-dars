import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import {
  createDeliveryStaff,
  getDeliveryStaff,
  getDeliveryStaffById,
  updateDeliveryStaff,
  deleteDeliveryStaff
} from "../controller/deliveryStaff.controller.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin") ,createDeliveryStaff);
router.get("/",authGuard,ownershipOrRole("admin"),getDeliveryStaff);
router.get("/:id",authGuard,ownershipOrRole("admin","DeliveryStaff"),getDeliveryStaffById);
router.put("/:id", authGuard,ownershipOrRole("admin","DeliveryStaff"),updateDeliveryStaff);
router.delete("/:id", deleteDeliveryStaff);

export default router;

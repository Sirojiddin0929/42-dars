import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";
import {
  createDeliveryStaff,
  getDeliveryStaff,
  getDeliveryStaffById,
  updateDeliveryStaff,
  deleteDeliveryStaff
} from "../controller/deliveryStaff.controller.js";

const router = express.Router();

router.post("/",authGuard,checkRole("admin") ,createDeliveryStaff);
router.get("/",authGuard,checkRole("admin"),getDeliveryStaff);
router.get("/:id",authGuard,checkRole("admin","DeliveryStaff"),getDeliveryStaffById);
router.put("/:id", authGuard,checkRole("admin","DeliveryStaff"),updateDeliveryStaff);
router.delete("/:id", deleteDeliveryStaff);

export default router;

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
import { validate } from "../middleware/validate.middleware.js";
import { staffSchema,staffSchemaUpdate } from "../validation/deliveryStaff.validation.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin") ,validate(staffSchema),createDeliveryStaff);
router.get("/",authGuard,ownershipOrRole("admin"),getDeliveryStaff);
router.get("/:id",authGuard,ownershipOrRole("admin","DeliveryStaff"),getDeliveryStaffById);
router.put("/:id", authGuard,ownershipOrRole("admin","DeliveryStaff"),validate(staffSchemaUpdate),updateDeliveryStaff);
router.delete("/:id", authGuard,ownershipOrRole("admin","DeliveryStaff") ,deleteDeliveryStaff);

export {router as deliveryStaffRouter}

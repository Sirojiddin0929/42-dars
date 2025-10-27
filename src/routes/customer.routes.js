import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controller/customer.controller.js";

const router = express.Router();

router.post("/",authGuard,checkRole("admin"), createCustomer);
router.get("/",authGuard,checkRole("admin"), getCustomers);
router.get("/:id", authGuard,getCustomerById);
router.put("/:id", authGuard,updateCustomer);
router.delete("/:id", authGuard, checkRole("admin"),deleteCustomer);

export default router;

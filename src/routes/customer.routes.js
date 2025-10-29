import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controller/customer.controller.js";
import { customerschema,customerschemaUpdate } from "../validation/customer.validation.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin"), customerschema,createCustomer);
router.get("/",authGuard,ownershipOrRole("admin"), getCustomers);
router.get("/:id", authGuard,getCustomerById);
router.put("/:id", authGuard,customerschemaUpdate,updateCustomer);
router.delete("/:id", authGuard, ownershipOrRole("admin"),deleteCustomer);

export default router;

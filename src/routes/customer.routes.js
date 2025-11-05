import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controller/customer.controller.js";
import { customerschema,customerschemaUpdate } from "../validation/customer.validation.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin"),validate(customerschema),createCustomer);
router.get("/",authGuard, getCustomers);
router.get("/:id", authGuard,ownershipOrRole("admin","Customer"),getCustomerById);
router.put("/:id", authGuard,ownershipOrRole("admin","Customer"),validate(customerschemaUpdate),updateCustomer);
router.delete("/:id", authGuard, ownershipOrRole("admin","Customer"),deleteCustomer);

export {router as customerRouter}

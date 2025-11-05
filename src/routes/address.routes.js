import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
} from "../controller/address.contoller.js";
import { validate } from "../middleware/validate.middleware.js";
import { addressschema ,addresschemaUpdate} from "../validation/address.validation.js";


const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin","Customer"), validate(addressschema) ,createAddress);
router.get("/", authGuard,getAddresses);
router.get("/:id", authGuard, getAddressById);
router.put("/:id", authGuard,ownershipOrRole("admin","Customer"),validate(addresschemaUpdate),updateAddress);
router.delete("/:id",authGuard,ownershipOrRole("admin","Customer"), deleteAddress);

export {router as addressRouter}

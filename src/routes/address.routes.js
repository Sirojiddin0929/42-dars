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


const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin","Customer") ,createAddress);
router.get("/", authGuard,getAddresses);
router.get("/:id", authGuard, getAddressById);
router.put("/:id", authGuard,ownershipOrRole("admin","customer"),updateAddress);
router.delete("/:id",authGuard,ownershipOrRole("admin"), deleteAddress);

export default router;

import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
} from "../controller/address.contoller.js";

const router = express.Router();

router.post("/",authGuard,checkRole("admin","Customer") ,createAddress);
router.get("/", authGuard,getAddresses);
router.get("/:id", authGuard, getAddressById);
router.put("/:id", authGuard,checkRole("admin","customer"),updateAddress);
router.delete("/:id",authGuard,checkRole("admin"), deleteAddress);

export default router;

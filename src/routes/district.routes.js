import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";
import {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict
} from "../controller/district.controller.js";

const router = express.Router();

router.post("/", authGuard,ownershipOrRole("admin"),createDistrict);
router.get("/", authGuard,ownershipOrRole("admin","Customer"), getDistricts);
router.get("/:id", authGuard,ownershipOrRole("admin","Customer"),getDistrictById);
router.put("/:id", authGuard,ownershipOrRole("admin"),updateDistrict);
router.delete("/:id", authGuard,ownershipOrRole("admin"),deleteDistrict);

export default router;

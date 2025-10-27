import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";
import {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict
} from "../controller/district.controller.js";

const router = express.Router();

router.post("/", authGuard,checkRole("admin"),createDistrict);
router.get("/", authGuard,checkRole("admin","Customer"), getDistricts);
router.get("/:id", authGuard,checkRole("admin","Customer"),getDistrictById);
router.put("/:id", authGuard,checkRole("admin"),updateDistrict);
router.delete("/:id", authGuard,checkRole("admin"),deleteDistrict);

export default router;

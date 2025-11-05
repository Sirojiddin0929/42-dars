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
import { validate } from "../middleware/validate.middleware.js";
import { districtschema,districtschemaUpdate } from "../validation/district.validation.js";

const router = express.Router();

router.post("/", authGuard,ownershipOrRole("admin","Customer"),validate(districtschema),createDistrict);
router.get("/", authGuard,ownershipOrRole("admin","Customer"), getDistricts);
router.get("/:id", authGuard,ownershipOrRole("admin","Customer"),getDistrictById);
router.put("/:id", authGuard,ownershipOrRole("admin","Customer"),validate(districtschemaUpdate),updateDistrict);
router.delete("/:id", authGuard,ownershipOrRole("admin","Customer"),deleteDistrict);

export {router as districtRouter}

import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { ownershipOrRole } from "../middleware/roleGuard.js";

import {
  createWaterProduct,
  getWaterProducts,
  getWaterProductById,
  updateWaterProduct,
  deleteWaterProduct
} from "../controller/waterProduct.controller.js";

const router = express.Router();

router.post("/",authGuard,ownershipOrRole("admin"), createWaterProduct);
router.get("/", authGuard,getWaterProducts);
router.get("/:id",authGuard, getWaterProductById);
router.put("/:id",authGuard,ownershipOrRole("admin"), updateWaterProduct);
router.delete("/:id", authGuard,ownershipOrRole("admin"),deleteWaterProduct);

export default router;

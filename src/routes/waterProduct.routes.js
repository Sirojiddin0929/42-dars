import express from "express";
import { authGuard } from "../middleware/authGuard.js";
import { checkRole } from "../middleware/roleGuard.js";

import {
  createWaterProduct,
  getWaterProducts,
  getWaterProductById,
  updateWaterProduct,
  deleteWaterProduct
} from "../controller/waterProduct.controller.js";

const router = express.Router();

router.post("/",authGuard,checkRole("admin"), createWaterProduct);
router.get("/", authGuard,getWaterProducts);
router.get("/:id",authGuard, getWaterProductById);
router.put("/:id",authGuard,checkRole("admin"), updateWaterProduct);
router.delete("/:id", authGuard,checkRole("admin"),deleteWaterProduct);

export default router;

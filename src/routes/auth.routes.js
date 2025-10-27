import express from "express";
import { register, login, refresh, logout } from "../controller/auth.controller.js";
import { validate } from "../validation/index.js";
import { registerSchema, loginSchema, refreshSchema } from "../validation/auth.validation.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", authGuard, logout);

export default router;

// backend/routes/authRoutes.js
import express from "express";
import { registerPatient, loginPatient, listUsers } from "../controllers/authController.js";
import protect from "../middleware/auth.js";
import isStaff from "../middleware/isStaff.js";

const router = express.Router();

// Public: register & login
router.post("/register", registerPatient);
router.post("/login", loginPatient);

// Protected: only staff can list users
router.get("/users", protect, isStaff, listUsers);

export default router;

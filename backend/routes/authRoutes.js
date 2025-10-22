// backend/routes/authRoutes.js
import express from "express";
import { registerPatient } from "../controllers/authController.js";
import { loginPatient } from "../controllers/authController.js";


const router = express.Router();

// Tout le monde peut créer un patient
router.post("/register", registerPatient);
router.post("/login", loginPatient);

export default router;

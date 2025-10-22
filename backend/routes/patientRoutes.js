import express from 'express';
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patientController.js';
import { registerPatient } from '../controllers/authController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Public: register a patient
router.post('/register', registerPatient);

// Protected patient CRUD routes
router.post('/', protect, createPatient);
router.get('/', protect, getPatients);
router.get('/:id', protect, getPatientById);
router.put('/:id', protect, updatePatient);
router.delete('/:id', protect, deletePatient);

export default router;

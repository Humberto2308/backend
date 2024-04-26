import express from 'express';
import * as HoursController from '../controllers/Hours.js';
import { verifyUser } from '../Middleware/AuthUser.js';

const router = express.Router();

// Rutas para el modelo de Usuario
router.get('/hours', verifyUser, HoursController.getAllhours);
router.get('/hours/:id', verifyUser, HoursController.getHoursById);
router.post('/hours', verifyUser, HoursController.createHours);
router.patch('/hours/:id', verifyUser, HoursController.updateHours);
router.delete('/hours/:id', verifyUser, HoursController.deleteHours);

export default router;
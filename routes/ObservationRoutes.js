import express from 'express';
import * as ObservationsController from '../controllers/Observations.js';

import { verifyUser } from '../Middleware/AuthUser.js';
const router = express.Router();

// Rutas para el modelo de Usuario
router.get('/observations', verifyUser,  ObservationsController.getAllObservation);
router.get('/observations/:id', verifyUser, ObservationsController.getObservationById);
router.post('/observations', verifyUser, ObservationsController.createObservation);
router.patch('/observations/:id', verifyUser, ObservationsController.updateObservation);
router.delete('/observations/:id', verifyUser, ObservationsController.deleteObservation);

export default router;
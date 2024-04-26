import express from 'express';
import * as ClassesController from '../controllers/Classes.js';

import { verifyUser } from '../Middleware/AuthUser.js';


const router = express.Router();

// Rutas para el modelo de Usuario
router.get('/Classes', verifyUser,  ClassesController.getAllClases);
router.get('/Classes/:id', verifyUser, ClassesController.getClasesById);
router.post('/Classes', verifyUser, ClassesController.createClases);
router.patch('/Classes/:id', verifyUser, ClassesController.updateClases);
router.delete('/Classes/:id', verifyUser, ClassesController.deleteClases);

export default router;
import express from 'express';
import * as SignatureController from '../controllers/Signature.js';
import { verifyUser } from '../Middleware/AuthUser.js';

const router = express.Router();

// Rutas para el modelo de Usuario
router.get('/signatures', verifyUser, SignatureController.getAllSignature);
router.get('/signatures/:id', verifyUser, SignatureController.getSignatureById);
router.post('/signatures', verifyUser, SignatureController.createSignature);
router.patch('/signatures/:id', verifyUser, SignatureController.updateSignature);
router.delete('/signatures/:id', verifyUser, SignatureController.deleteSignature);

export default router;
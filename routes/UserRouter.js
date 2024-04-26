import express from 'express';
import * as UserController from '../controllers/User.js';


const router = express.Router();

// Rutas para el modelo de Usuario
router.get('/users',  UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.patch('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
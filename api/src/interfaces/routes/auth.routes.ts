import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

export default function authRoutes(authController: AuthController) {
    const router = Router();
    router.post('/login', authController.loginUser);
    return router;
}

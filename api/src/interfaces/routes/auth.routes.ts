import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

export default function authRoutes(authController: AuthController) {
    const router = Router();

    router.post('/login', authController.loginUser);
    router.post('/register', authController.registerUser);
    router.post('/refresh', authController.refresh);
    router.get('/me', authController.me);
    router.post('/logout', authController.logout);

    return router;
}

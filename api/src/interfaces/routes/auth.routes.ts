import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/dataValidation.middleware.js';
import { loginSchema, registerSchema } from '../schemas/schemas/auth.schema.js';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';

const authlimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

export default function authRoutes(
    authController: AuthController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);

    router.post('/login', authlimiter, validate(loginSchema), authController.loginUser);
    router.post('/register', authlimiter, validate(registerSchema), authController.registerUser);
    router.post('/refresh', authController.refresh);
    router.get('/me', auth, authController.me);
    router.post('/logout', authController.logout);

    return router;
}

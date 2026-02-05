import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';

export default function userRoutes(
    userController: UserController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);

    router.post('/register', userController.create);

    router.get('/', auth, userController.findAll);
    router.get('/:id', auth, userController.findById);
    router.get('/email/:email', auth, userController.findByEmail);
    router.put('/:id', auth, userController.update);
    router.delete('/:id', auth, userController.delete);

    return router;
}

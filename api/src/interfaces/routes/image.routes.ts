import { Router } from 'express';
import { ImageController } from '../controllers/image.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';

export default function imageRoutes(
    imageController: ImageController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);

    router.get('/', auth, imageController.findAll);
    router.get('/:id', auth, imageController.findById);
    router.post('/', auth, imageController.create);
    router.put('/:id', auth, imageController.update);
    router.delete('/:id', auth, imageController.delete);
    return router;
}

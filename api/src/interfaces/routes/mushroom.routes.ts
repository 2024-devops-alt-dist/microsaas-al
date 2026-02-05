import { Router } from 'express';
import { MushroomController } from '../controllers/mushroom.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';

export default function mushroomRoutes(
    mushroomController: MushroomController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);

    router.get('/', auth, mushroomController.findAll);
    router.get('/:id', auth, mushroomController.findById);
    router.post('/', auth, mushroomController.create);
    router.put('/:id', auth, mushroomController.update);
    router.delete('/:id', mushroomController.delete);
    return router;
}

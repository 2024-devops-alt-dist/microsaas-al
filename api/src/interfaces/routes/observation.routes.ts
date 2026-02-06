import { Router } from 'express';
import { ObservationController } from '../controllers/observation.controller.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isAdminMiddleware } from '../middlewares/isAdmin.middleware.js';

export default function observationRoutes(
    observationController: ObservationController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);
    const isAdmin = isAdminMiddleware;

    router.get('/', auth, isAdmin, observationController.findAll);
    router.get('/:id', auth, observationController.findById);
    router.post('/', auth, observationController.create);
    router.put('/:id', auth, observationController.update);
    router.delete('/:id', auth, observationController.delete);

    return router;
}

import { Router } from 'express';
import { MushroomController } from '../controllers/mushroom.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { isAdminMiddleware } from '../middlewares/isAdmin.middleware.js';
import { validate } from '../middlewares/dataValidation.middleware.js';
import { createMushroomSchema, updateMushroomSchema } from '../schemas/schemas/mushroom.schema.js';

export default function mushroomRoutes(
    mushroomController: MushroomController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);
    const isAdmin = isAdminMiddleware;

    router.get('/', mushroomController.findAll);
    router.get('/:id', mushroomController.findById);
    router.post('/', auth, isAdmin, validate(createMushroomSchema), mushroomController.create);
    router.put('/:id', auth, isAdmin, validate(updateMushroomSchema), mushroomController.update);
    router.delete('/:id', auth, isAdmin, mushroomController.delete);
    return router;
}

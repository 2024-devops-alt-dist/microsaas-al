import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { isAdminMiddleware } from '../middlewares/isAdmin.middleware.js';
import { isOwnerOrAdminMiddleware } from '../middlewares/isOwnerOrAdmin.middleware.js';
import { validate } from '../middlewares/dataValidation.middleware.js';
import { createUserSchema, updateUserSchema } from '../schemas/schemas/user.schema.js';

export default function userRoutes(
    userController: UserController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);
    const isAdmin = isAdminMiddleware;
    const isOwnerOrAdmin = isOwnerOrAdminMiddleware;

    router.get('/', auth, isAdmin, userController.findAll);
    router.post('/', auth, isAdmin, validate(createUserSchema), userController.create);
    router.get('/:id', auth, isOwnerOrAdmin, userController.findById);
    router.get('/email/:email', auth, isAdmin, userController.findByEmail);
    router.put('/:id', auth, isOwnerOrAdmin, validate(updateUserSchema), userController.update);
    router.delete('/:id', auth, isOwnerOrAdmin, userController.delete);

    return router;
}

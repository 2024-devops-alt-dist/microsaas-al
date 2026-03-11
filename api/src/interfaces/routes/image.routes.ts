import { Router } from 'express';
import { ImageController } from '../controllers/image.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { imageOwnerOrAdminMiddleware } from '../middlewares/imageOwnerOrAdmin.middleware.js';
import { FindImageById } from '../../usecases/image/findImageById.js';
import { FindObservationById } from '../../usecases/observation/findObservationById.js';
import { validate } from '../middlewares/dataValidation.middleware.js';
import { createImageSchema, updateImageSchema } from '../schemas/schemas/image.schema.js';

export default function imageRoutes(
    imageController: ImageController,
    authService: IAuthService,
    findUserById: FindUserById,
    findImageById: FindImageById,
    findObservationById: FindObservationById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);
    const ownerOrAdmin = imageOwnerOrAdminMiddleware(findImageById, findObservationById);

    router.get('/', imageController.findAll);
    router.get('/:id', imageController.findById);
    router.post('/', auth, validate(createImageSchema), imageController.create);
    router.put('/:id', auth, ownerOrAdmin, validate(updateImageSchema), imageController.update);
    router.delete('/:id', auth, ownerOrAdmin, imageController.delete);
    return router;
}

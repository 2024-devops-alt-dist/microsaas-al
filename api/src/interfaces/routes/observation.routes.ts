import { Router } from 'express';
import { ObservationController } from '../controllers/observation.controller.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { observationOwnerOrAdminMiddleware } from '../middlewares/observationsOwnerOrAdmin.middleware.js';
import { FindObservationById } from '../../usecases/observation/findObservationById.js';
import {
    createObservationSchema,
    updateObservationSchema,
} from '../schemas/schemas/observation.schema.js';
import { validate } from '../middlewares/dataValidation.middleware.js';

export default function observationRoutes(
    observationController: ObservationController,
    authService: IAuthService,
    findUserById: FindUserById,
    findObservationById: FindObservationById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);
    const ownerOrAdmin = observationOwnerOrAdminMiddleware(findObservationById);

    router.get('/', observationController.findAll);
    router.get('/:id', observationController.findById);
    router.post('/', auth, validate(createObservationSchema), observationController.create);
    router.put(
        '/:id',
        auth,
        ownerOrAdmin,
        validate(updateObservationSchema),
        observationController.update,
    );
    router.delete('/:id', auth, ownerOrAdmin, observationController.delete);

    return router;
}

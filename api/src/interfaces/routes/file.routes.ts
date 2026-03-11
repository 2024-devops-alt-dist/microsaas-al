import { Router } from 'express';
import { FileController } from '../controllers/file.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { IAuthService } from '../../domain/services/IAuthService.js';

export default function fileRoutes(
    fileController: FileController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);

    router.post('/upload', auth, fileController.upload.bind(fileController));

    return router;
}

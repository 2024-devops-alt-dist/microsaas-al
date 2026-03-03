import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';

export default function commentRoutes(
    commentController: CommentController,
    authService: IAuthService,
    findUserById: FindUserById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);

    router.get('/', auth, commentController.findAll);
    router.get('/:id', auth, commentController.findById);
    router.post('/', auth, commentController.create);
    router.put('/:id', auth, commentController.update);
    router.delete('/:id', auth, commentController.delete);

    return router;
}

import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { commentOwnerOrAdminMiddleware } from '../middlewares/commentOwnerOrAdmin.middelware.js';
import { FindCommentById } from '../../usecases/comment/findCommentById.js';
import { createCommentSchema, updateCommentSchema } from '../schemas/schemas/comment.schema.js';
import { validate } from '../middlewares/dataValidation.middleware.js';

export default function commentRoutes(
    commentController: CommentController,
    authService: IAuthService,
    findUserById: FindUserById,
    findCommentById: FindCommentById,
) {
    const router = Router();
    const auth = authMiddleware(authService, findUserById);
    const ownerOrAdmin = commentOwnerOrAdminMiddleware(findCommentById);

    router.get('/', auth, commentController.findAll);
    router.get('/:id', auth, commentController.findById);
    router.post('/', auth, validate(createCommentSchema), commentController.create);
    router.put('/:id', auth, ownerOrAdmin, validate(updateCommentSchema), commentController.update);
    router.delete('/:id', auth, ownerOrAdmin, commentController.delete);

    return router;
}

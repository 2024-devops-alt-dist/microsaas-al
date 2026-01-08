import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';

export default function commentRoutes(commentController: CommentController) {
    const router = Router();
    router.get('/', commentController.findAll);
    router.get('/:id', commentController.findById);
    router.post('/', commentController.create);
    router.put('/:id', commentController.update);
    router.delete('/:id', commentController.delete);
    return router;
}

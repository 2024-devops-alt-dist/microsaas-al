import { NextFunction, Request, Response } from 'express';
import { FindCommentById } from '../../usecases/comment/findCommentById.js';

export const commentOwnerOrAdminMiddleware =
    (findCommentById: FindCommentById) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const ressourceId = Number(req.params.id);

            const comment = await findCommentById.execute(ressourceId);

            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            if (req.user.role !== 'ADMIN' && comment.userId !== req.user.id) {
                return res.status(403).json({ message: 'Forbidden access' });
            }

            next();
        } catch {
            return res.status(403).json({ message: 'Forbidden access' });
        }
    };

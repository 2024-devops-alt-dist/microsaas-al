import { Request, Response, NextFunction } from 'express';
import { FindAllComments } from '../../usecases/comment/findAllComments.js';
import { FindCommentById } from '../../usecases/comment/findCommentById.js';
import { CreateComment } from '../../usecases/comment/createComment.js';
import { UpdateComment } from '../../usecases/comment/updateComment.js';
import { DeleteComment } from '../../usecases/comment/deleteComment.js';

export class CommentController {
    constructor(
        private findAllComments: FindAllComments,
        private findCommentById: FindCommentById,
        private createComment: CreateComment,
        private updateComment: UpdateComment,
        private deleteComment: DeleteComment,
    ) {}

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const comments = await this.findAllComments.execute();
            res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const comment = await this.findCommentById.execute(Number(req.params.id));
            res.status(200).json(comment);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newComment = await this.createComment.execute(req.body);
            res.status(201).json(newComment);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updatedComment = await this.updateComment.execute(
                Number(req.params.id),
                req.body,
            );
            res.status(200).json(updatedComment);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.deleteComment.execute(Number(req.params.id));
            res.status(204).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}

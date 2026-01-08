import { CreateComment } from 'api/src/usecases/comment/createComment';
import { DeleteComment } from 'api/src/usecases/comment/deleteComment';
import { FindAllComments } from 'api/src/usecases/comment/findAllComments';
import { FindCommentById } from 'api/src/usecases/comment/findCommentById';
import { UpdateComment } from 'api/src/usecases/comment/updateComment';
import { Request, Response, NextFunction } from 'express';

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
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}

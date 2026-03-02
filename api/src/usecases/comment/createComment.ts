import { Status } from '../../domain/constant/status.js';
import { Comment } from '../../domain/entities/Comment.js';
import { BadRequestError } from '../../domain/errors/BadRequestError.js';
import { ICommentRepository } from '../../interfaces/repositories/ICommentRepository.js';

export class CreateComment {
    constructor(private commentRepository: ICommentRepository) {}

    async execute(commentData: {
        content: string;
        status: string;
        userId: number;
        observationId: number;
    }): Promise<Comment> {
        if (!commentData.content || !commentData.userId || !commentData.observationId) {
            throw new BadRequestError('Invalid comment data');
        }
        const newComment = {
            content: commentData.content,
            status: commentData.status as Status,
            userId: commentData.userId,
            observationId: commentData.observationId,
        };
        return await this.commentRepository.create(newComment);
    }
}

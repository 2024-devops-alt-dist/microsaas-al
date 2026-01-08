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
        return await this.commentRepository.create(
            new Comment(
                null,
                commentData.content,
                commentData.status as Status,
                null,
                null,
                commentData.userId,
                commentData.observationId,
            ),
        );
    }
}

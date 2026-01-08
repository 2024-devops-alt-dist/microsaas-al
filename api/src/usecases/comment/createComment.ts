import { Status } from 'api/src/domain/constant/status';
import { Comment } from 'api/src/domain/entities/Comment';
import { BadRequestError } from 'api/src/domain/errors/BadRequestError';
import { ICommentRepository } from 'api/src/interfaces/repositories/ICommentRepository';

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

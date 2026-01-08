import { Comment } from 'api/src/domain/entities/Comment';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { ICommentRepository } from 'api/src/interfaces/repositories/ICommentRepository';

export class FindCommentById {
    constructor(private commentRepository: ICommentRepository) {}

    async execute(id: number): Promise<Comment | null> {
        const comment = await this.commentRepository.findById(id);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        return comment;
    }
}

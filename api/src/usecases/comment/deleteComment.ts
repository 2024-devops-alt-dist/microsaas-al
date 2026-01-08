import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { ICommentRepository } from 'api/src/interfaces/repositories/ICommentRepository';

export class DeleteComment {
    constructor(private commentRepository: ICommentRepository) {}
    async execute(id: number): Promise<void> {
        const comment = await this.commentRepository.findById(id);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        await this.commentRepository.delete(id);
    }
}

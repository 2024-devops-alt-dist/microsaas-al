import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { ICommentRepository } from '../../interfaces/repositories/ICommentRepository.js';

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

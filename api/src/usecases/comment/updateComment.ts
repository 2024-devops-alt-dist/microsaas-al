import { Comment } from '../../domain/entities/Comment.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { ICommentRepository } from '../../interfaces/repositories/ICommentRepository.js';

export class UpdateComment {
    constructor(private commentRepository: ICommentRepository) {}
    async execute(id: number, data: Partial<Comment>): Promise<Comment> {
        const comment = await this.commentRepository.findById(id);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        return this.commentRepository.update(id, data);
    }
}

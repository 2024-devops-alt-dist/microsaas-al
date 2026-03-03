import { Comment } from '../../domain/entities/Comment.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { ICommentRepository } from '../../interfaces/repositories/ICommentRepository.js';

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

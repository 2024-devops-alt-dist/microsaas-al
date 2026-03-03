import { Comment } from '../../domain/entities/Comment.js';
import { ICommentRepository } from '../../interfaces/repositories/ICommentRepository.js';

export class FindAllComments {
    constructor(private commentRepository: ICommentRepository) {}

    async execute(): Promise<Comment[]> {
        return this.commentRepository.findAll();
    }
}

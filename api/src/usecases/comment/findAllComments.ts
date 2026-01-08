import { Comment } from 'api/src/domain/entities/Comment';
import { ICommentRepository } from 'api/src/interfaces/repositories/ICommentRepository';

export class FindAllComments {
    constructor(private commentRepository: ICommentRepository) {}

    async execute(): Promise<Comment[]> {
        return this.commentRepository.findAll();
    }
}

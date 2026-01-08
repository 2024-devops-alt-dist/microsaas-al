import { Comment } from 'api/src/domain/entities/Comment';

export interface ICommentRepository {
    findAll(): Promise<Comment[]>;
    findById(id: number): Promise<Comment | null>;
    create(comment: Comment): Promise<Comment>;
    update(id: number, data: Partial<Comment>): Promise<Comment>;
    delete(id: number): Promise<void>;
}

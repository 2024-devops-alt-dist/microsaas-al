import { Comment } from '../../domain/entities/Comment.js';
import { CommentCreationType } from '../../domain/types/CommentCreationType.js';

export interface ICommentRepository {
    findAll(): Promise<Comment[]>;
    findById(id: number): Promise<Comment | null>;
    create(commentCreationType: CommentCreationType): Promise<Comment>;
    update(id: number, data: Partial<Comment>): Promise<Comment>;
    delete(id: number): Promise<void>;
}

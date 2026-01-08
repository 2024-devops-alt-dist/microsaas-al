import { Comment } from 'api/src/domain/entities/Comment';
import { ICommentRepository } from 'api/src/interfaces/repositories/ICommentRepository';

export const mockCommentRepository = (): jest.Mocked<ICommentRepository> => ({
    findAll: jest.fn<Promise<Comment[]>, []>(),
    findById: jest.fn<Promise<Comment | null>, [number]>(),
    create: jest.fn<Promise<Comment>, [Comment]>(),
    update: jest.fn<Promise<Comment>, [number, Partial<Comment>]>(),
    delete: jest.fn<Promise<void>, [number]>(),
});

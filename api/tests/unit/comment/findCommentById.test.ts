import { mockCommentRepository } from './mocks/commentRepository.mock';
import { mockComment1 } from './mocks/comment.mock';
import { FindCommentById } from '../../../src/usecases/comment/findCommentById.js';
import { NotFoundError } from '../../../src/domain/errors/NotFoundError.js';

describe('FindCommentById Use Case', () => {
    it('should return the comment when found', async () => {
        const repo = mockCommentRepository();

        repo.findById.mockResolvedValue(mockComment1);
        const useCase = new FindCommentById(repo);
        const result = await useCase.execute(1);

        expect(result).toEqual(mockComment1);
        expect(repo.findById).toHaveBeenCalledWith(1);
        expect(repo.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null when comment is not found', async () => {
        const repo = mockCommentRepository();

        repo.findById.mockResolvedValue(null);

        const useCase = new FindCommentById(repo);
        await expect(useCase.execute(1)).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1)).rejects.toMatchObject({
            message: 'Comment not found',
            status: 404,
        });
    });
});

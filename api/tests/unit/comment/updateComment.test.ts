import { UpdateComment } from '../../../src/usecases/comment/updateComment.js';
import { NotFoundError } from '../../../src/domain/errors/NotFoundError.js';
import { mockCommentRepository } from './mocks/commentRepository.mock';
import { mockComment1 } from './mocks/comment.mock';

describe('UpdateComment Use Case', () => {
    it('should update a comment', async () => {
        const repo = mockCommentRepository();

        repo.findById.mockResolvedValue(mockComment1);
        repo.update.mockResolvedValue({
            ...mockComment1,
            content: 'Updated comment content',
        });

        const useCase = new UpdateComment(repo);
        const updatedComment = await useCase.execute(mockComment1.id, {
            content: 'Updated comment content',
        });

        expect(updatedComment.content).toBe('Updated comment content');
        expect(repo.findById).toHaveBeenCalledWith(mockComment1.id);
        expect(repo.update).toHaveBeenCalledWith(mockComment1.id, {
            content: 'Updated comment content',
        });
    });

    it('should throw 404 error if comment not found', async () => {
        const repo = mockCommentRepository();
        repo.findById.mockResolvedValue(null);
        const useCase = new UpdateComment(repo);

        await expect(useCase.execute(1, {})).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1, {})).rejects.toMatchObject({
            message: 'Comment not found',
            status: 404,
        });
    });
});

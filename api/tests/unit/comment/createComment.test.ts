import { CreateComment } from '../../../src/usecases/comment/createComment.js';
import { mockCommentRepository } from './mocks/commentRepository.mock.js';

describe('CreateComment Use Case', () => {
    it('should create a comment', async () => {
        const repo = mockCommentRepository();

        repo.create.mockImplementation(async (comment) => ({
            ...comment,
            id: 1,
        }));

        const useCase = new CreateComment(repo);

        const data = {
            content: 'Great observation!',
            status: 'SUBMITTED',
            userId: 2,
            observationId: 3,
        };

        const result = await useCase.execute(data);

        expect(result.id).toBe(1);
        expect(result.content).toBe(data.content);
        expect(result.userId).toBe(data.userId);
        expect(result.observationId).toBe(data.observationId);

        expect(repo.create).toHaveBeenCalledTimes(1);
    });
    it('should throw if required data is missing', async () => {
        const repo = mockCommentRepository();

        const useCase = new CreateComment(repo);

        const incompleteData = {
            content: '',
            status: '',
            userId: 2,
            observationId: 3,
        };

        await expect(useCase.execute(incompleteData)).rejects.toThrow('Invalid comment data');
    });
});

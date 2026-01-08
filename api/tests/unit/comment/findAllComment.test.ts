import { mockCommentRepository } from './mocks/commentRepository.mock';
import { FindAllComments } from 'api/src/usecases/comment/findAllComments';
import { mockComment1, mockComment2 } from './mocks/comment.mock';

describe('FindAllComment Use Case', () => {
    it('shouldreturn all comments', async () => {
        const repo = mockCommentRepository();
        repo.findAll.mockResolvedValue([mockComment1, mockComment2]);
        const useCase = new FindAllComments(repo);
        const comments = await useCase.execute();

        expect(comments).toHaveLength(2);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });
});

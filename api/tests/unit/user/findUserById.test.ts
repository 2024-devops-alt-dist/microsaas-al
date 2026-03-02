import { mockUser1 } from './mocks/user.mock';
import { mockUserRepository } from './mocks/userRepository.mock';
import { FindUserById } from '../../../src/usecases/user/findUserById.js';
import { NotFoundError } from '../../../src/domain/errors/NotFoundError.js';

describe('FindUserById Use Case', () => {
    it('should return user if found', async () => {
        const repo = mockUserRepository();
        repo.findById.mockResolvedValue(mockUser1);

        const useCase = new FindUserById(repo);
        const user = await useCase.execute(1);

        expect(user).not.toBeNull();
        expect(user!.id).toBe(1);
    });

    it('should throw 404 error if user not found', async () => {
        const repo = mockUserRepository();
        repo.findById.mockResolvedValue(null);

        const useCase = new FindUserById(repo);

        await expect(useCase.execute(1)).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1)).rejects.toMatchObject({
            message: 'User not found',
            status: 404,
        });
    });
});

import { mockUser1 } from './mocks/user.mock';
import { mockUserRepository } from './mocks/userRepository.mock';
import { FindUserByEmail } from '../../../src/usecases/user/findUserByEmail.js';
import { NotFoundError } from '../../../src/domain/errors/NotFoundError.js';

describe('FindUserByEmail Use Case', () => {
    it('should return user if found', async () => {
        const repo = mockUserRepository();
        repo.findByEmail.mockResolvedValue(mockUser1);

        const useCase = new FindUserByEmail(repo);
        const user = await useCase.execute('john@example.com');

        expect(user).not.toBeNull();
        expect(user!.email).toBe('john@example.com');
    });

    it('should throw if user not found', async () => {
        const repo = mockUserRepository();
        repo.findByEmail.mockResolvedValue(null);
        const useCase = new FindUserByEmail(repo);

        await expect(useCase.execute('john@example.com')).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute('john@example.com')).rejects.toMatchObject({
            message: 'User not found',
            status: 404,
        });
    });
});

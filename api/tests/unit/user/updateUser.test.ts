import { UpdateUser } from 'api/src/usecases/user/updateUser';
import { mockUser1 } from './mocks/user.mock';
import { mockUserRepository } from './mocks/userRepository.mock';
import { Role } from 'api/src/domain/constant/role';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';

describe('UpdateUser Use Case', () => {
    it('should update user if exists', async () => {
        const repo = mockUserRepository();

        repo.findById.mockResolvedValue(mockUser1);
        repo.update.mockResolvedValue({
            id: 1,
            email: 'john@example.com',
            password: 'securepassword',
            username: 'john_doe',
            firstname: 'Jane',
            lastname: 'Doe',
            role: Role.USER,
            createdAt: new Date(),
            updatedAt: new Date(),
            observations: [],
            comments: [],
        });

        const useCase = new UpdateUser(repo);
        const result = await useCase.execute(1, { firstname: 'Jane' });

        expect(result.firstname).toBe('Jane');
    });

    it('should throw if user does not exist', async () => {
        const repo = mockUserRepository();
        repo.findById.mockResolvedValue(null);

        const useCase = new UpdateUser(repo);

        await expect(useCase.execute(1, {})).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1, {})).rejects.toMatchObject({
            message: 'User not found',
            status: 404,
        });
    });
});

import { mockUser1 } from './mocks/user.mock';
import { mockUserRepository } from './mocks/userRepository.mock';
import { CreateUser } from '../../../src/usecases/user/createUser.js';
import { Role } from '../../../src/domain/constant/role.js';

describe('CreateUser Use Case', () => {
    it('should create a user with hashed password', async () => {
        const repo = mockUserRepository();

        repo.findByEmail.mockResolvedValue(null);
        repo.create.mockImplementation(async (user) => ({
            ...user,
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            observations: [],
            comments: [],
            role: user.role as Role,
        }));

        const useCase = new CreateUser(repo);

        const data = {
            email: 'john@example.com',
            password: 'securepassword',
            username: 'john_doe',
            firstname: 'John',
            lastname: 'Doe',
            role: Role.USER,
        };

        const result = await useCase.execute(data);

        expect(result.id).toBe(1);
        expect(result.email).toBe(data.email);

        expect(repo.create).toHaveBeenCalledTimes(1);
    });

    it('should throw if email already exists', async () => {
        const repo = mockUserRepository();
        repo.findByEmail.mockResolvedValue(mockUser1);

        const useCase = new CreateUser(repo);

        await expect(
            useCase.execute({
                email: 'john@example.com',
                password: 'password',
                username: 'john',
                firstname: 'John',
                lastname: 'Doe',
                role: Role.USER,
            }),
        ).rejects.toThrow();
    });
});

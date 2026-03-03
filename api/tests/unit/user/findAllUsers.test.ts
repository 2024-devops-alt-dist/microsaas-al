import { mockUserRepository } from './mocks/userRepository.mock';
import { mockUser1, mockUser2 } from './mocks/user.mock';
import { FindAllUsers } from '../../../src/usecases/user/findAllUsers.js';

describe('FindAllUsers Use Case', () => {
    it('should return all users', async () => {
        const repo = mockUserRepository();

        repo.findAll.mockResolvedValue([mockUser1, mockUser2]);

        const useCase = new FindAllUsers(repo);
        const users = await useCase.execute();

        expect(users).toHaveLength(2);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });
});

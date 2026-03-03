import { mockUser1 } from '../user/mocks/user.mock';
import { mockUserRepository } from '../user/mocks/userRepository.mock';
import { mockAuthService } from './mocks/authService.mock.js';
import { LoginUser } from '../../../src/usecases/auth/loginUser.js';

describe('LoginUser Use Case', () => {
    it('should jwt token if valid credentials are provided', async () => {
        const repo = mockUserRepository();
        const authService = mockAuthService;

        repo.findByEmail.mockResolvedValue({ ...mockUser1, password: 'hashed-password' });
        authService.comparePasswords.mockResolvedValue(true);
        authService.generateAccessToken.mockReturnValue('valid-access-jwt-token');
        authService.generateRefreshToken.mockReturnValue('valid-refresh-jwt-token');

        const useCase = new LoginUser(repo, authService);

        const tokens = await useCase.execute('john@example.com', 'securepassword');

        expect(tokens.accessToken).toBeDefined();
        expect(tokens.refreshToken).toBeDefined();
        expect(typeof tokens.accessToken).toBe('string');
        expect(typeof tokens.refreshToken).toBe('string');
    });

    it('should throw NotFoundError if user does not exist', async () => {
        const repo = mockUserRepository();
        const authService = mockAuthService;

        repo.findByEmail.mockResolvedValue(null);

        const useCase = new LoginUser(repo, authService);

        await expect(useCase.execute('john@example.com', 'securepassword')).rejects.toThrow(
            'User not found',
        );
    });

    it('should throw UnauthorizedError if password is incorrect', async () => {
        const repo = mockUserRepository();
        const authService = mockAuthService;

        repo.findByEmail.mockResolvedValue({ ...mockUser1, password: 'hashed-password' });
        authService.comparePasswords.mockResolvedValue(false);

        const useCase = new LoginUser(repo, authService);

        await expect(useCase.execute('john@example.com', 'wrongpassword')).rejects.toThrow(
            'Invalid credentials',
        );
    });
});

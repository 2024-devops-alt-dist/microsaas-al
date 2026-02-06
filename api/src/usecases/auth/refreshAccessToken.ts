import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { UnauthorizedError } from '../../domain/errors/UnauthorizedError.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository.js';

export class RefreshAccessToken {
    constructor(
        private userRepository: IUserRepository,
        private authService: IAuthService,
    ) {}

    async execute(refreshToken: string): Promise<string> {
        const decoded = this.authService.verifyRefreshToken(refreshToken);

        if (typeof decoded === 'string') {
            throw new UnauthorizedError('Invalid or expired refresh token');
        }

        const user = await this.userRepository.findById(decoded.id);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const accessToken = this.authService.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return accessToken;
    }
}

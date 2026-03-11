import { UnauthorizedError } from '../../domain/errors/UnauthorizedError.js';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository.js';
import { AuthService } from '../../infrastructure/services/AuthService.js';

export class LoginUser {
    constructor(
        private userRepository: IUserRepository,
        private authService: AuthService,
    ) {}

    async execute(
        email: string,
        password: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Invalid credentials');
        }
        if (!(await this.authService.comparePasswords(password, user.password))) {
            throw new UnauthorizedError('Invalid credentials');
        }
        const accessToken = this.authService.generateAccessToken({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
        });
        const refreshToken = this.authService.generateRefreshToken({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
        });

        return { accessToken, refreshToken };
    }
}

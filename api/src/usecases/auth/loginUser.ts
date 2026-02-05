import { UnauthorizedError } from '../../domain/errors/UnauthorizedError.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository.js';
import { AuthService } from '../../infrastructure/services/AuthService.js';

export class LoginUser {
    constructor(
        private userRepository: IUserRepository,
        private authService: AuthService,
    ) {}

    async execute(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        if (!(await this.authService.comparePasswords(password, user.password))) {
            throw new UnauthorizedError('Invalid credentials');
        }
        const accessToken = this.authService.generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return accessToken;
    }
}

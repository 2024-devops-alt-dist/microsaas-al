import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export class FindUserByEmail {
    constructor(private userRepository: IUserRepository) {}
    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }
}

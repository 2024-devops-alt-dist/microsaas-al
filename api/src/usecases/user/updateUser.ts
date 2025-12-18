import { User } from 'api/src/domain/entities/User';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export class UpdateUser {
    constructor(private userRepository: IUserRepository) {}
    async execute(id: number, data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return await this.userRepository.update(id, data);
    }
}

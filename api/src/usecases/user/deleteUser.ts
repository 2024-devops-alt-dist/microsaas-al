import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export class DeleteUser {
    constructor(private userRepository: IUserRepository) {}
    async execute(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        await this.userRepository.delete(id);
    }
}

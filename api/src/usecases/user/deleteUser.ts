import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository.js';

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

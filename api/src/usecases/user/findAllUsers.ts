import { User } from '../../domain/entities/User.js';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository.js';

export class FindAllUsers {
    constructor(private userRepository: IUserRepository) {}
    async execute(): Promise<Omit<User, 'password'>[]> {
        return await this.userRepository.findAll();
    }
}

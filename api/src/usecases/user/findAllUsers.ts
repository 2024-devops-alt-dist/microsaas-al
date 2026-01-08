import { User } from 'api/src/domain/entities/User';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export class FindAllUsers {
    constructor(private userRepository: IUserRepository) {}
    async execute(): Promise<Omit<User, 'password'>[]> {
        return await this.userRepository.findAll();
    }
}

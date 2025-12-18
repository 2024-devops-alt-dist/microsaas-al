import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export class DeleteUser {
    constructor(private userRepository: IUserRepository) {}
    async execute(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}

import { User } from 'api/src/domain/entities/User';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export class UpdateUser {
    constructor(private userRepository: IUserRepository) {}
    async execute(id: number, data: Partial<User>): Promise<Omit<User, 'password'>> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const updatedUser = await this.userRepository.update(id, data);
        const returnedUser: Omit<User, 'password'> = {
            id: updatedUser.id,
            email: updatedUser.email,
            username: updatedUser.username,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            observations: updatedUser.observations,
            comments: updatedUser.comments,
        };
        return returnedUser;
    }
}

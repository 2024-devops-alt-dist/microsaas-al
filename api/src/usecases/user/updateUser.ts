import { User } from '../../domain/entities/User.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository.js';

export class UpdateUser {
    constructor(private userRepository: IUserRepository) {}
    async execute(
        id: number,
        data: Partial<User>,
        currentUser: { role: string },
    ): Promise<Omit<User, 'password'>> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        if (currentUser.role !== 'ADMIN' && data.role) {
            throw new Error('Only admins can change user roles');
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

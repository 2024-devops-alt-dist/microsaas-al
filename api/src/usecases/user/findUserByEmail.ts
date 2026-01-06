import { User } from 'api/src/domain/entities/User';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export class FindUserByEmail {
    constructor(private userRepository: IUserRepository) {}
    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const returnedUser: Omit<User, 'password'> = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            observations: user.observations,
            comments: user.comments,
        };
        return returnedUser;
    }
}

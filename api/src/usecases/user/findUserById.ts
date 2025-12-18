import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';
import { UserResponseDto } from '../dtos/UserResponseDto';

export class FindUserById {
    constructor(private userRepository: IUserRepository) {}
    async execute(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const returnedUser: UserResponseDto = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        return returnedUser;
    }
}

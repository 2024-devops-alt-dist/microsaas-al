import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';
import { UserResponseDto } from '../dtos/UserResponseDto';

export class FindAllUsers {
    constructor(private userRepository: IUserRepository) {}
    async execute(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAll();
        const returnedUsers: UserResponseDto[] = [];
        for (const user of users) {
            returnedUsers.push({
                id: user.id,
                email: user.email,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        }
        return returnedUsers;
    }
}

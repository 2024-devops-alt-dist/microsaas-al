import { Role } from 'api/src/domain/constant/role';
import { User } from 'api/src/domain/entities/User';
import { BadRequestError } from 'api/src/domain/errors/BadRequestError';
import { EmailAlreadyExistsError } from 'api/src/domain/errors/EmailAlreadyExistsError';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';
import { hashPassword } from 'api/src/utils/hashPassword';

export class CreateUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(userData: {
        email: string;
        password: string;
        username: string;
        firstname: string;
        lastname: string;
        role: string;
    }): Promise<Omit<User, 'password'>> {
        if (
            !userData.email ||
            !userData.password ||
            !userData.username ||
            !userData.firstname ||
            !userData.lastname ||
            !userData.role
        ) {
            throw new BadRequestError('Invalid user data');
        }
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new EmailAlreadyExistsError('Email already in use');
        }
        const newUser = await this.userRepository.create(
            new User(
                null,
                userData.email,
                await hashPassword(userData.password),
                userData.username,
                userData.firstname,
                userData.lastname,
                userData.role as Role,
                null,
                null,
                [],
                [],
            ),
        );
        const returnedUser: Omit<User, 'password'> = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            observations: newUser.observations,
            comments: newUser.comments,
        };
        return returnedUser;
    }
}

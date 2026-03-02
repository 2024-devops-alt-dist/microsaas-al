import { User } from '../domain/entities/User.js';
import { Prisma, User as UserPrisma } from './database/prisma/generated/prisma/client.js';
import { prisma } from './database/prisma/prisma.js';
import { Role as DomainRole, Role } from '../domain/constant/role.js';

export class UserRepository {
    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        const usersEntities: User[] = [];
        for (const user of users) {
            usersEntities.push(this.mapPrismaUserToDomain(user));
        }
        return usersEntities;
    }

    async findById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user ? this.mapPrismaUserToDomain(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user ? this.mapPrismaUserToDomain(user) : null;
    }

    async create(userCreationPayload: {
        email: string;
        password: string;
        username: string;
        firstname: string;
        lastname: string;
        role: Role;
    }): Promise<User> {
        const userPrisma: Prisma.UserCreateInput = {
            email: userCreationPayload.email,
            password: userCreationPayload.password,
            username: userCreationPayload.username,
            firstname: userCreationPayload.firstname,
            lastname: userCreationPayload.lastname,
            role: userCreationPayload.role,
        };
        const createdUser = await prisma.user.create({ data: userPrisma });
        return this.mapPrismaUserToDomain(createdUser);
    }

    async update(id: number, data: User): Promise<User> {
        const userPrisma: Prisma.UserUpdateInput = {};
        if (data.email !== null) userPrisma.email = data.email;
        if (data.password !== null) userPrisma.password = data.password;
        if (data.username !== null) userPrisma.username = data.username;
        if (data.firstname !== null) userPrisma.firstname = data.firstname;
        if (data.lastname !== null) userPrisma.lastname = data.lastname;
        if (data.role !== null) userPrisma.role = data.role;
        const user = await prisma.user.update({
            where: { id },
            data: userPrisma,
        });
        return this.mapPrismaUserToDomain(user);
    }

    async delete(id: number): Promise<void> {
        await prisma.user.delete({
            where: { id },
        });
    }

    private mapRoleToDomain(role: string): DomainRole {
        if (role === 'ADMIN') {
            return DomainRole.ADMIN;
        }
        return DomainRole.USER;
    }

    private mapPrismaUserToDomain(userPrisma: UserPrisma): User {
        return new User(
            userPrisma.id,
            userPrisma.email,
            userPrisma.password,
            userPrisma.username,
            userPrisma.firstname,
            userPrisma.lastname,
            this.mapRoleToDomain(userPrisma.role),
            userPrisma.createdAt,
            userPrisma.updatedAt,
            [],
            [],
        );
    }
}

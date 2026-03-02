import { Role } from '../../../../src/domain/constant/role.js';

export const mockUser1 = {
    id: 1,
    email: 'john@example.com',
    password: 'securepassword',
    username: 'john_doe',
    firstname: 'John',
    lastname: 'Doe',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    observations: [],
    comments: [],
};

export const mockUser2 = {
    id: 2,
    email: 'jane@example.com',
    password: 'hashedpassword',
    username: 'jane_doe',
    firstname: 'Jane',
    lastname: 'Doe',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    observations: [],
    comments: [],
};

export const mockUserNoPassword = {
    id: 1,
    email: 'john@example.com',
    username: 'john_doe',
    firstname: 'John',
    lastname: 'Doe',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    observations: [],
    comments: [],
};

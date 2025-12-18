import { User } from 'api/src/domain/entities/User';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export const mockUserRepository = (): jest.Mocked<IUserRepository> => ({
    findAll: jest.fn<Promise<User[]>, []>(),
    findById: jest.fn<Promise<User | null>, [number]>(),
    findByEmail: jest.fn<Promise<User | null>, [string]>(),
    create: jest.fn<Promise<User>, [User]>(),
    update: jest.fn<Promise<User>, [number, Partial<User>]>(),
    delete: jest.fn<Promise<void>, [number]>(),
});

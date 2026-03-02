import { jest } from '@jest/globals';
import { IUserRepository } from 'api/src/interfaces/repositories/IUserRepository';

export const mockUserRepository = (): jest.Mocked<IUserRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

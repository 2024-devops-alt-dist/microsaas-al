import { jest } from '@jest/globals';
import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';

export const mockMushroomRepository = (): jest.Mocked<IMushroomRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

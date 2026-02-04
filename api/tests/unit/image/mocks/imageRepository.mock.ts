import { jest } from '@jest/globals';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

export const mockImageRepository = (): jest.Mocked<IImageRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

import { jest } from '@jest/globals';
import { ICommentRepository } from '../../../../src/interfaces/repositories/ICommentRepository.js';

export const mockCommentRepository = (): jest.Mocked<ICommentRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

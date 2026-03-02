import { jest } from '@jest/globals';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

export const mockObservationRepository = (): jest.Mocked<IObservationRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

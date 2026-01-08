import { Observation } from 'api/src/domain/entities/Observation';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

export const mockObservationRepository = (): jest.Mocked<IObservationRepository> => ({
    findAll: jest.fn<Promise<Observation[]>, []>(),
    findById: jest.fn<Promise<Observation | null>, [number]>(),
    create: jest.fn<Promise<Observation>, [Observation]>(),
    update: jest.fn<Promise<Observation>, [number, Partial<Observation>]>(),
    delete: jest.fn<Promise<void>, [number]>(),
});

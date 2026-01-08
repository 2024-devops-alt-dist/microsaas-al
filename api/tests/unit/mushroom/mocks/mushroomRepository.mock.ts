import { Mushroom } from 'api/src/domain/entities/Mushroom';
import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';

export const mockMushroomRepository = (): jest.Mocked<IMushroomRepository> => ({
    findAll: jest.fn<Promise<Mushroom[]>, []>(),
    findById: jest.fn<Promise<Mushroom | null>, [number]>(),
    create: jest.fn<Promise<Mushroom>, [Mushroom]>(),
    update: jest.fn<Promise<Mushroom>, [number, Partial<Mushroom>]>(),
    delete: jest.fn<Promise<void>, [number]>(),
});

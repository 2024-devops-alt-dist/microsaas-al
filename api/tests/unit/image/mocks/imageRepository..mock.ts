import { Image } from 'api/src/domain/entities/Image';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

export const mockImageRepository = (): jest.Mocked<IImageRepository> => ({
    findAll: jest.fn<Promise<Image[]>, []>(),
    findById: jest.fn<Promise<Image | null>, [number]>(),
    create: jest.fn<Promise<Image>, [Image]>(),
    update: jest.fn<Promise<Image>, [number, Partial<Image>]>(),
    delete: jest.fn<Promise<void>, [number]>(),
});

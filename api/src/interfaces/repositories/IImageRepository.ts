import { Image } from 'api/src/domain/entities/Image';

export interface IImageRepository {
    findAll(): Promise<Image[]>;
    findById(id: number): Promise<Image | null>;
    create(image: Image): Promise<Image>;
    update(id: number, data: Partial<Image>): Promise<Image>;
    delete(id: number): Promise<void>;
}

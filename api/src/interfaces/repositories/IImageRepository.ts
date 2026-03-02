import { Image } from '../../domain/entities/Image.js';
import { ImageCreationType } from '../../domain/types/ImageCreationType.js';

export interface IImageRepository {
    findAll(): Promise<Image[]>;
    findById(id: number): Promise<Image | null>;
    create(imageCreationType: ImageCreationType): Promise<Image>;
    update(id: number, data: Partial<Image>): Promise<Image>;
    delete(id: number): Promise<void>;
}

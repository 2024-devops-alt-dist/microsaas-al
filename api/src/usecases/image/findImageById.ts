import { Image } from '../../domain/entities/Image.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IImageRepository } from '../../interfaces/repositories/IImageRepository.js';

export class FindImageById {
    constructor(private imageRepository: IImageRepository) {}

    async execute(id: number): Promise<Image> {
        const image = await this.imageRepository.findById(id);
        if (!image) {
            throw new NotFoundError('Image not found');
        }
        return image;
    }
}

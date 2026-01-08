import { Image } from 'api/src/domain/entities/Image';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

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

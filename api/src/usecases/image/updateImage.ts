import { Image } from 'api/src/domain/entities/Image';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

export class UpdateImage {
    constructor(private imageRepository: IImageRepository) {}

    async execute(id: number, data: Partial<Image>): Promise<Image> {
        const image = await this.imageRepository.findById(id);
        if (!image) {
            throw new NotFoundError('Image not found');
        }
        return await this.imageRepository.update(id, data);
    }
}

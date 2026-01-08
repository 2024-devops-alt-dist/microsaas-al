import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

export class DeleteImage {
    constructor(private imageRepository: IImageRepository) {}

    async execute(id: number): Promise<void> {
        const image = await this.imageRepository.findById(id);
        if (!image) {
            throw new NotFoundError('Image not found');
        }
        await this.imageRepository.delete(id);
    }
}

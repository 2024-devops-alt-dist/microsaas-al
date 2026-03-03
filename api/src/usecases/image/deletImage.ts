import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IImageRepository } from '../../interfaces/repositories/IImageRepository.js';

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

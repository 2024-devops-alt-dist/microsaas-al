import { Image } from '../../domain/entities/Image.js';
import { IImageRepository } from '../../interfaces/repositories/IImageRepository.js';

export class FindAllImages {
    constructor(private imageRepository: IImageRepository) {}

    async execute(): Promise<Image[]> {
        return this.imageRepository.findAll();
    }
}

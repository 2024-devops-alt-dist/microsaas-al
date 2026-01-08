import { Image } from 'api/src/domain/entities/Image';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

export class FindAllImages {
    constructor(private imageRepository: IImageRepository) {}

    async execute(): Promise<Image[]> {
        return this.imageRepository.findAll();
    }
}

import { Image } from 'api/src/domain/entities/Image';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

export class FindImageById {
    constructor(private imageRepository: IImageRepository) {}

    async execute(id: number): Promise<Image | null> {
        const image = await this.imageRepository.findById(id);
        if (!image) {
            return null;
        }
        return image;
    }
}

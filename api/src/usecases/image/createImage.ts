import { Image } from '../../domain/entities/Image.js';
import { BadRequestError } from '../../domain/errors/BadRequestError.js';
import { IImageRepository } from '../../interfaces/repositories/IImageRepository.js';

export class CreateImage {
    constructor(private imageRepository: IImageRepository) {}

    async execute(imageData: {
        url: string;
        filename: string;
        mimeType: string;
        size: number;
        observationId: number | null;
        mushroomId: number | null;
    }): Promise<Image> {
        if (
            !imageData.url ||
            !imageData.filename ||
            !imageData.mimeType ||
            imageData.size === undefined ||
            (imageData.observationId === undefined && imageData.mushroomId === undefined)
        ) {
            throw new BadRequestError('Invalid image data');
        }
        const newImage = {
            url: imageData.url,
            filename: imageData.filename,
            mimeType: imageData.mimeType,
            size: imageData.size,
            observationId: imageData.observationId || null,
            mushroomId: imageData.mushroomId || null,
        };
        return await this.imageRepository.create(newImage);
    }
}

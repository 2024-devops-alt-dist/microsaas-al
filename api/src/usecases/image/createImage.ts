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
        return await this.imageRepository.create(
            new Image(
                null,
                imageData.url,
                imageData.filename,
                imageData.mimeType,
                imageData.size,
                null,
                null,
                imageData.observationId || null,
                imageData.mushroomId || null,
            ),
        );
    }
}

import { Image } from 'api/src/domain/entities/Image';
import { BadRequestError } from 'api/src/domain/errors/BadRequestError';
import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

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

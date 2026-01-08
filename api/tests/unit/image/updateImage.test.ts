import { UpdateImage } from 'api/src/usecases/image/updateImage';
import { mockImageRepository } from './mocks/imageRepository..mock';
import { Image } from 'api/src/domain/entities/Image';

describe('UpdateImage Use Case', () => {
    it('should update and return the image', async () => {
        const repo = mockImageRepository();

        const mockUpdatedImage = new Image(
            1,
            'http://example.com/updated_image.jpg',
            'updated_image.jpg',
            'image/jpeg',
            204800,
            new Date(),
            new Date(),
            2,
            null,
        );

        repo.findById.mockResolvedValue(mockUpdatedImage);
        repo.update.mockResolvedValue(mockUpdatedImage);
        const useCase = new UpdateImage(repo);
        const result = await useCase.execute(1, {
            url: 'http://example.com/updated_image.jpg',
            filename: 'updated_image.jpg',
            mimeType: 'image/jpeg',
            size: 204800,
            observationId: 2,
            mushroomId: null,
        });

        expect(result).toEqual(mockUpdatedImage);
        expect(repo.update).toHaveBeenCalledWith(1, {
            url: 'http://example.com/updated_image.jpg',
            filename: 'updated_image.jpg',
            mimeType: 'image/jpeg',
            size: 204800,
            observationId: 2,
            mushroomId: null,
        });
        expect(repo.update).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if image not found', async () => {
        const repo = mockImageRepository();

        repo.findById.mockResolvedValue(null);
        const useCase = new UpdateImage(repo);

        await expect(useCase.execute(1, {})).rejects.toBeInstanceOf(Error);

        await expect(useCase.execute(1, {})).rejects.toMatchObject({
            message: 'Image not found',
        });
    });
});

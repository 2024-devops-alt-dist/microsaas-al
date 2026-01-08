import { FindImageById } from 'api/src/usecases/image/findImageById';
import { mockImageRepository } from './mocks/imageRepository..mock';
import { Image } from 'api/src/domain/entities/Image';

describe('FindImageById Use Case', () => {
    it('should return the image when found', async () => {
        const repo = mockImageRepository();

        const mockImage = new Image(
            1,
            'http://example.com/image.jpg',
            'image.jpg',
            'image/jpeg',
            102400,
            new Date(),
            new Date(),
            2,
            null,
        );

        repo.findById.mockResolvedValue(mockImage);
        const useCase = new FindImageById(repo);
        const result = await useCase.execute(1);

        expect(result).toEqual(mockImage);
        expect(repo.findById).toHaveBeenCalledWith(1);
        expect(repo.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null when image is not found', async () => {
        const repo = mockImageRepository();

        repo.findById.mockResolvedValue(null);

        const useCase = new FindImageById(repo);
        const result = await useCase.execute(999);

        expect(result).toBeNull();
        expect(repo.findById).toHaveBeenCalledWith(999);
        expect(repo.findById).toHaveBeenCalledTimes(1);
    });
});

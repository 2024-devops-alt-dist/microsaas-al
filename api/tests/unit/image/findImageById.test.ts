import { FindImageById } from '../../../src/usecases/image/findImageById.js';
import { mockImageRepository } from './mocks/imageRepository.mock.js';
import { mockImage1 } from './mocks/image.mock.js';
import { NotFoundError } from '../../../src/domain/errors/NotFoundError.js';

describe('FindImageById Use Case', () => {
    it('should return the image when found', async () => {
        const repo = mockImageRepository();

        repo.findById.mockResolvedValue(mockImage1);
        const useCase = new FindImageById(repo);
        const result = await useCase.execute(1);

        expect(result).toEqual(mockImage1);
        expect(repo.findById).toHaveBeenCalledWith(1);
        expect(repo.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null when image is not found', async () => {
        const repo = mockImageRepository();

        repo.findById.mockResolvedValue(null);

        const useCase = new FindImageById(repo);
        await expect(useCase.execute(1)).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1)).rejects.toMatchObject({
            message: 'Image not found',
            status: 404,
        });
    });
});

import { FindAllImages } from '../../../src/usecases/image/findAllImages.js';
import { mockImageRepository } from './mocks/imageRepository.mock.js';
import { mockImage1 } from './mocks/image.mock';

describe('FindAllImages Use Case', () => {
    it('should return all images', async () => {
        const repo = mockImageRepository();
        repo.findAll.mockResolvedValue([mockImage1, mockImage1]);
        const useCase = new FindAllImages(repo);
        const images = await useCase.execute();

        expect(images).toHaveLength(2);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });
});

import { FindAllImages } from 'api/src/usecases/image/findAllImages';
import { mockImageRepository } from './mocks/imageRepository..mock';

describe('FindAllImages Use Case', () => {
    it('should return all images', async () => {
        const repo = mockImageRepository();

        repo.findAll.mockResolvedValue([]);

        const useCase = new FindAllImages(repo);
        const images = await useCase.execute();

        expect(images).toHaveLength(0);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });
});

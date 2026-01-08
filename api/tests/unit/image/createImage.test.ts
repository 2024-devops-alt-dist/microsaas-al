import { CreateImage } from 'api/src/usecases/image/createImage';
import { mockImageRepository } from './mocks/imageRepository..mock';

describe('CreateImage Use Case', () => {
    it('should create an image', async () => {
        const repo = mockImageRepository();

        repo.create.mockImplementation(async (image) => ({
            ...image,
            id: 1,
        }));

        const useCase = new CreateImage(repo);

        const data = {
            url: 'http://example.com/image.jpg',
            filename: 'image2.jpg',
            mimeType: 'image/jpeg',
            size: 102400,
            observationId: 2,
            mushroomId: null,
        };

        const result = await useCase.execute(data);

        expect(result.id).toBe(1);
        expect(result.url).toBe(data.url);
        expect(result.observationId).toBe(data.observationId);

        expect(repo.create).toHaveBeenCalledTimes(1);
    });
    it('should throw if required data is missing', async () => {
        const repo = mockImageRepository();

        const useCase = new CreateImage(repo);

        const incompleteData = {
            url: '',
            filename: '',
            mimeType: 'image/jpeg',
            size: 102400,
            observationId: 2,
            mushroomId: null,
        };

        await expect(useCase.execute(incompleteData)).rejects.toThrow('Invalid image data');
    });
});

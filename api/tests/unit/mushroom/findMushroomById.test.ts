import { FindMushroomById } from '../../../src/usecases/mushroom/findMushroomById.js';
import { mockMushroom1 } from './mocks/mockMushroom';
import { mockMushroomRepository } from './mocks/mushroomRepository.mock';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';

describe('FindMushroomById Use Case', () => {
    it('should return the mushroom with the given ID', async () => {
        const repo = mockMushroomRepository();

        repo.findById.mockResolvedValue(mockMushroom1);
        const useCase = new FindMushroomById(repo);
        const mushroom = await useCase.execute(1);

        expect(mushroom).toBeDefined();
        expect(mushroom?.id).toBe(1);
        expect(repo.findById).toHaveBeenCalledWith(1);
        expect(repo.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null if mushroom not found', async () => {
        const repo = mockMushroomRepository();

        repo.findById.mockResolvedValue(null);
        const useCase = new FindMushroomById(repo);

        await expect(useCase.execute(1)).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1)).rejects.toMatchObject({
            message: 'Mushroom not found',
            status: 404,
        });
    });
});

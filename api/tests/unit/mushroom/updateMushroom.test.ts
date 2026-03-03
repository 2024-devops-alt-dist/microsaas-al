import { NotFoundError } from '../../../src/domain/errors/NotFoundError.js';
import { mockMushroomRepository } from './mocks/mushroomRepository.mock';
import { mockMushroom1 } from './mocks/mockMushroom';
import { UpdateMushroom } from '../../../src/usecases/mushroom/updateMushroom.js';
import { Edibility } from '../../../src/domain/constant/edibility.js';

describe('UpdateUser Use Case', () => {
    it('should update user if exists', async () => {
        const repo = mockMushroomRepository();

        repo.findById.mockResolvedValue(mockMushroom1);
        repo.update.mockResolvedValue({
            id: 1,
            commonName: 'Amanite tue mouche',
            species: 'Amanita muscaria',
            genus: 'Amanita',
            family: 'Amanitaceae',
            edibility: Edibility.POISONOUS,
            habitat: 'forests',
            description: 'A distinctive mushroom with a bright red cap and white spots.',
            createdAt: new Date('2023-01-01T00:00:00Z'),
            updatedAt: new Date('2023-01-01T00:00:00Z'),
            observations: [],
            images: [],
        });

        const useCase = new UpdateMushroom(repo);
        const result = await useCase.execute(1, { commonName: 'Amanite tue mouche' });

        expect(result.commonName).toBe('Amanite tue mouche');
    });

    it('should throw if user does not exist', async () => {
        const repo = mockMushroomRepository();
        repo.findById.mockResolvedValue(null);

        const useCase = new UpdateMushroom(repo);

        await expect(useCase.execute(1, {})).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1, {})).rejects.toMatchObject({
            message: 'Mushroom not found',
            status: 404,
        });
    });
});

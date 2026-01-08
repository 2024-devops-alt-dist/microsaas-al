import { CreateMushroom } from 'api/src/usecases/mushroom/createMushroom';
import { mockMushroomRepository } from './mocks/mushroomRepository.mock';

describe('CreateMushroom Use Case', () => {
    it('should create a mushroom with valid data', async () => {
        const repo = mockMushroomRepository();
        repo.create.mockImplementation(async (mushroom) => ({
            ...mushroom,
            id: 1,
        }));
        const useCase = new CreateMushroom(repo);
        const data = {
            commonName: 'Amanita muscaria',
            species: 'Amanita muscaria',
            genus: 'Amanita',
            family: 'Amanitaceae',
            edibility: 'POISONOUS',
            habitat: 'forests',
            description: 'A distinctive mushroom with a bright red cap and white spots.',
        };
        const result = await useCase.execute(data);
        expect(result.id).toBe(1);
        expect(result.commonName).toBe(data.commonName);
        expect(result.edibility).toBe(data.edibility);
        expect(repo.create).toHaveBeenCalledTimes(1);
    });

    it('should throw if required data is missing', async () => {
        const repo = mockMushroomRepository();
        const useCase = new CreateMushroom(repo);
        const data = {
            commonName: '',
            species: 'Amanita muscaria',
            genus: 'Amanita',
            family: 'Amanitaceae',
            edibility: 'POISONOUS',
            habitat: 'forests',
            description: 'A distinctive mushroom with a bright red cap and white spots.',
        };
        await expect(useCase.execute(data)).rejects.toThrow();
    });
});

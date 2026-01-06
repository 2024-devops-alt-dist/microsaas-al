import { FindAllMushrooms } from 'api/src/usecases/mushroom/findAllMushrooms';
import { mockMushroom1, mockMushroom2 } from './mocks/mockMushroom';
import { mockMushroomRepository } from './mocks/mushroomRepository.mock';

describe('FindAllMushrooms Use Case', () => {
    it('should return all mushrooms', async () => {
        const repo = mockMushroomRepository();

        repo.findAll.mockResolvedValue([mockMushroom1, mockMushroom2]);
        const useCase = new FindAllMushrooms(repo);
        const mushrooms = await useCase.execute();

        expect(mushrooms).toHaveLength(2);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });
});

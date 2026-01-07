import { FindAllObservations } from 'api/src/usecases/observation/findAllObservations';
import { mockObservationRepository } from './mocks/observationRepository.mock';
import { mockObservation1, mockObservation2 } from './mocks/observation.mock';

describe('FindAllObservations Use Case', () => {
    it('should return all observations', async () => {
        const repo = mockObservationRepository();

        repo.findAll.mockResolvedValue([mockObservation1, mockObservation2]);

        const useCase = new FindAllObservations(repo);
        const observations = await useCase.execute();

        expect(observations).toHaveLength(2);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });
});

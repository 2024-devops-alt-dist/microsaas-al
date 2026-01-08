import { FindObservationById } from 'api/src/usecases/observation/findObservationById';
import { mockObservationRepository } from './mocks/observationRepository.mock';
import { mockObservation1 } from './mocks/observation.mock';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';

describe('FindObservationById Use Case', () => {
    it('should return the observation when found', async () => {
        const repo = mockObservationRepository();

        repo.findById.mockResolvedValue(mockObservation1);
        const useCase = new FindObservationById(repo);
        const result = await useCase.execute(1);

        expect(result).toEqual(mockObservation1);
        expect(repo.findById).toHaveBeenCalledWith(1);
        expect(repo.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null when observation is not found', async () => {
        const repo = mockObservationRepository();

        repo.findById.mockResolvedValue(null);

        const useCase = new FindObservationById(repo);
        await expect(useCase.execute(1)).rejects.toBeInstanceOf(NotFoundError);

        await expect(useCase.execute(1)).rejects.toMatchObject({
            message: 'Observation not found',
            status: 404,
        });
    });
});

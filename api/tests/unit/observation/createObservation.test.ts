import { mockObservationRepository } from './mocks/observationRepository.mock';
import { CreateObservation } from '../../../src/usecases/observation/createObservation.js';

describe('CreateObservation Use Case', () => {
    it('should create an observation', async () => {
        const repo = mockObservationRepository();

        repo.create.mockImplementation(async (observation) => ({
            ...observation,
            id: 1,
        }));

        const useCase = new CreateObservation(repo);

        const data = {
            title: 'Mushroom Sighting',
            date: new Date('2024-06-01'),
            latitude: 45.1234,
            longitude: -73.5678,
            quantity: 5,
            notes: 'Found near the old oak tree.',
            isPublic: true,
            confidenceLevel: 'LOW',
            userId: 2,
            mushroomId: 3,
        };

        const result = await useCase.execute(data);

        expect(result.id).toBe(1);
        expect(result.title).toBe(data.title);
        expect(result.latitude).toBe(data.latitude);
        expect(result.longitude).toBe(data.longitude);

        expect(repo.create).toHaveBeenCalledTimes(1);
    });
    it('should throw if required data is missing', async () => {
        const repo = mockObservationRepository();

        const useCase = new CreateObservation(repo);

        const incompleteData = {
            title: '',
            date: new Date('2024-06-01'),
            latitude: 45.1234,
            longitude: -73.5678,
            quantity: 5,
            notes: 'Found near the old oak tree.',
            isPublic: true,
            confidenceLevel: 'LOW',
            userId: 2,
            mushroomId: 3,
        };

        await expect(useCase.execute(incompleteData)).rejects.toThrow('Invalid observation data');
    });
});

import { UpdateObservation } from 'api/src/usecases/observation/updateObservation';
import { mockObservationRepository } from './mocks/observationRepository.mock';
import { ConfidenceLevel } from 'api/src/domain/constant/confidenceLevel';
import { mockObservation1 } from './mocks/observation.mock';

describe('UpdateObservation Use Case', () => {
    it('should update an observation', async () => {
        const repo = mockObservationRepository();

        repo.findById.mockResolvedValue(mockObservation1);

        repo.update.mockResolvedValue({
            id: 1,
            title: 'Updated Mushroom Sighting',
            date: new Date('2024-06-01'),
            latitude: 45.1234,
            longitude: -73.5678,
            quantity: 5,
            notes: 'Updated notes near the old oak tree.',
            isPublic: true,
            confidenceLevel: ConfidenceLevel.MEDIUM,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 2,
            mushroomId: 3,
            images: [],
            comments: [],
        });

        const useCase = new UpdateObservation(repo);

        const updateData = {
            title: 'Updated Mushroom Sighting',
            notes: 'Updated notes near the old oak tree.',
            isPublic: true,
        };

        const result = await useCase.execute(1, updateData);

        expect(result.id).toBe(1);
        expect(result.title).toBe(updateData.title);
        expect(result.notes).toBe(updateData.notes);
        expect(result.isPublic).toBe(updateData.isPublic);

        expect(repo.findById).toHaveBeenCalledWith(1);
        expect(repo.update).toHaveBeenCalledWith(1, expect.objectContaining(updateData));
        expect(repo.findById).toHaveBeenCalledTimes(1);
        expect(repo.update).toHaveBeenCalledTimes(1);
    });

    it('should throw if observation to update is not found', async () => {
        const repo = mockObservationRepository();

        repo.findById.mockResolvedValue(null);
        const useCase = new UpdateObservation(repo);

        const updateData = {
            title: 'Non-existent Observation',
        };

        await expect(useCase.execute(999, updateData)).rejects.toThrow('Observation not found');

        expect(repo.findById).toHaveBeenCalledWith(999);
        expect(repo.findById).toHaveBeenCalledTimes(1);
        expect(repo.update).not.toHaveBeenCalled();
    });
});

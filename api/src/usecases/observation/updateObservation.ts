import { Observation } from 'api/src/domain/entities/Observation';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

export class UpdateObservation {
    constructor(private observationRepository: IObservationRepository) {}

    async execute(id: number, data: Partial<Observation>): Promise<Observation> {
        const updatedObservation = await this.observationRepository.findById(id);
        if (!updatedObservation) {
            throw new NotFoundError('Observation not found');
        }
        return await this.observationRepository.update(id, data);
    }
}

import { Observation } from '../../domain/entities/Observation.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IObservationRepository } from '../../interfaces/repositories/IObservationRepository.js';

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

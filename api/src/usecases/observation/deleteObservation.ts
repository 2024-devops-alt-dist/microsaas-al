import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IObservationRepository } from '../../interfaces/repositories/IObservationRepository.js';

export class DeleteObservation {
    constructor(private observationRepository: IObservationRepository) {}

    async execute(id: number): Promise<void> {
        const observation = await this.observationRepository.findById(id);
        if (!observation) {
            throw new NotFoundError('Observation not found');
        }
        await this.observationRepository.delete(id);
    }
}

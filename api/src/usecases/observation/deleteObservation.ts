import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

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

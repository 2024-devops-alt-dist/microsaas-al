import { Observation } from '../../domain/entities/Observation.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IObservationRepository } from '../../interfaces/repositories/IObservationRepository.js';

export class FindObservationById {
    constructor(private observationRepository: IObservationRepository) {}
    async execute(id: number): Promise<Observation> {
        const observation = await this.observationRepository.findById(id);
        if (!observation) {
            throw new NotFoundError('Observation not found');
        }
        return observation;
    }
}

import { Observation } from 'api/src/domain/entities/Observation';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

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

import { Observation } from 'api/src/domain/entities/Observation';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

export class FindAllObservations {
    constructor(private observationRepository: IObservationRepository) {}

    async execute(): Promise<Observation[]> {
        return await this.observationRepository.findAll();
    }
}

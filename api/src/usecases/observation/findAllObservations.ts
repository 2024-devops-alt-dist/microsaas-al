import { Observation } from '../../domain/entities/Observation.js';
import { IObservationRepository } from '../../interfaces/repositories/IObservationRepository.js';

export class FindAllObservations {
    constructor(private observationRepository: IObservationRepository) {}

    async execute(): Promise<Observation[]> {
        return await this.observationRepository.findAll();
    }
}

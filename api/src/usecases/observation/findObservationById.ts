import { Observation } from 'api/src/domain/entities/Observation';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

export class FindObservationById {
    constructor(private observationRepository: IObservationRepository) {}
    async execute(id: number): Promise<Observation | null> {
        const observation = await this.observationRepository.findById(id);
        if (!observation) {
            return null;
        }
        return observation;
    }
}

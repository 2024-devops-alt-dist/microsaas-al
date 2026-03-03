import { Observation } from '../../domain/entities/Observation.js';
import { ObservationCreationType } from '../../domain/types/ObservationCreationType.js';

export interface IObservationRepository {
    findAll(): Promise<Observation[]>;
    findById(id: number): Promise<Observation | null>;
    create(observationCreationType: ObservationCreationType): Promise<Observation>;
    update(id: number, data: Partial<Observation>): Promise<Observation>;
    delete(id: number): Promise<void>;
}

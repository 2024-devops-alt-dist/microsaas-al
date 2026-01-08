import { Observation } from '../../domain/entities/Observation.js';

export interface IObservationRepository {
    findAll(): Promise<Observation[]>;
    findById(id: number): Promise<Observation | null>;
    create(observation: Observation): Promise<Observation>;
    update(id: number, data: Partial<Observation>): Promise<Observation>;
    delete(id: number): Promise<void>;
}

import { Mushroom } from '../../domain/entities/Mushroom.js';

export interface IMushroomRepository {
    findAll(): Promise<Mushroom[]>;
    findById(id: number): Promise<Mushroom | null>;
    create(mushroom: Mushroom): Promise<Mushroom>;
    update(id: number, data: Partial<Mushroom>): Promise<Mushroom>;
    delete(id: number): Promise<void>;
}

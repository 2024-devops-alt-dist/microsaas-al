import { Mushroom } from 'api/src/domain/entities/Mushroom';

export interface IMushroomRepository {
    findAll(): Promise<Mushroom[]>;
    findById(id: number): Promise<Mushroom | null>;
    create(mushroom: Mushroom): Promise<Mushroom>;
    update(id: number, data: Partial<Mushroom>): Promise<Mushroom>;
    delete(id: number): Promise<void>;
}

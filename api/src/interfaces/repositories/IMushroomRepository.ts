import { Mushroom } from '../../domain/entities/Mushroom.js';
import { MushroomCreationType } from '../../domain/types/mushroomCreationType.js';

export interface IMushroomRepository {
    findAll(): Promise<Mushroom[]>;
    findById(id: number): Promise<Mushroom | null>;
    create(mushroomCreationType: MushroomCreationType): Promise<Mushroom>;
    update(id: number, data: Partial<Mushroom>): Promise<Mushroom>;
    delete(id: number): Promise<void>;
}

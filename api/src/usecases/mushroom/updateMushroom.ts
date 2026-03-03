import { Mushroom } from '../../domain/entities/Mushroom.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IMushroomRepository } from '../../interfaces/repositories/IMushroomRepository.js';

export class UpdateMushroom {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(id: number, data: Partial<Mushroom>): Promise<Mushroom> {
        const mushroom = await this.mushroomRepository.findById(id);
        if (!mushroom) {
            throw new NotFoundError('Mushroom not found');
        }
        return await this.mushroomRepository.update(id, data);
    }
}

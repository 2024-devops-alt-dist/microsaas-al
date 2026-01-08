import { Mushroom } from '../../domain/entities/Mushroom.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IMushroomRepository } from '../../interfaces/repositories/IMushroomRepository.js';

export class FindMushroomById {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(mushroomId: number): Promise<Mushroom> {
        const mushroom = await this.mushroomRepository.findById(mushroomId);
        if (!mushroom) {
            throw new NotFoundError('Mushroom not found');
        }
        return mushroom;
    }
}

import { NotFoundError } from '../../domain/errors/NotFoundError.js';
import { IMushroomRepository } from '../../interfaces/repositories/IMushroomRepository.js';

export class DeleteMushroom {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(id: number): Promise<void> {
        const mushroom = await this.mushroomRepository.findById(id);
        if (!mushroom) {
            throw new NotFoundError('Mushroom not found');
        }
        await this.mushroomRepository.delete(id);
    }
}

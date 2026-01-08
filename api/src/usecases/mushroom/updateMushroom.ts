import { Mushroom } from 'api/src/domain/entities/Mushroom';
import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';

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

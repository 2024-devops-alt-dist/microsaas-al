import { Mushroom } from 'api/src/domain/entities/Mushroom';
import { NotFoundError } from 'api/src/domain/errors/NotFoundError';
import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';

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

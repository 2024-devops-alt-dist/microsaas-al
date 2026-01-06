import { Mushroom } from 'api/src/domain/entities/Mushroom';
import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';

export class FindMushroomById {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(mushroomId: number): Promise<Mushroom | null> {
        const mushroom = await this.mushroomRepository.findById(mushroomId);
        if (!mushroom) {
            return null;
        }
        return mushroom;
    }
}

import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';

export class DeleteMushroom {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(id: number): Promise<void> {
        const mushroom = await this.mushroomRepository.findById(id);
        if (!mushroom) {
            throw new Error('Mushroom not found');
        }
        await this.mushroomRepository.delete(id);
    }
}

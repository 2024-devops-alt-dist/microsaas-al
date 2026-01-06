import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';
import { Mushroom } from 'api/src/domain/entities/Mushroom';

export class FindAllMushrooms {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(): Promise<Mushroom[]> {
        return await this.mushroomRepository.findAll();
    }
}

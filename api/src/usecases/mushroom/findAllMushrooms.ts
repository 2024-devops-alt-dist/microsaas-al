import { Mushroom } from '../../domain/entities/Mushroom.js';
import { IMushroomRepository } from '../../interfaces/repositories/IMushroomRepository.js';

export class FindAllMushrooms {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(): Promise<Mushroom[]> {
        return await this.mushroomRepository.findAll();
    }
}

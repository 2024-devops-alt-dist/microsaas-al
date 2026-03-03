import { Edibility } from '../../domain/constant/edibility.js';
import { Mushroom } from '../../domain/entities/Mushroom.js';
import { BadRequestError } from '../../domain/errors/BadRequestError.js';
import { IMushroomRepository } from '../../interfaces/repositories/IMushroomRepository.js';

export class CreateMushroom {
    constructor(private mushroomRepository: IMushroomRepository) {}
    async execute(mushroomData: {
        commonName: string;
        species: string;
        genus: string;
        family: string;
        edibility: string;
        habitat: string | null;
        description: string | null;
    }): Promise<Mushroom> {
        if (
            !mushroomData.commonName ||
            !mushroomData.species ||
            !mushroomData.genus ||
            !mushroomData.family ||
            !mushroomData.edibility
        ) {
            throw new BadRequestError('Invalid mushroom data');
        }
        const newMushroom = {
            commonName: mushroomData.commonName,
            species: mushroomData.species,
            genus: mushroomData.genus,
            family: mushroomData.family,
            edibility: mushroomData.edibility as Edibility,
            habitat: mushroomData.habitat || null,
            description: mushroomData.description || null,
        };
        return await this.mushroomRepository.create(newMushroom);
    }
}

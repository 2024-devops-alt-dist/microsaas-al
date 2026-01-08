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
        return await this.mushroomRepository.create(
            new Mushroom(
                null,
                mushroomData.commonName,
                mushroomData.species,
                mushroomData.genus,
                mushroomData.family,
                mushroomData.edibility as Edibility,
                mushroomData.habitat,
                mushroomData.description,
                null,
                null,
                [],
                [],
            ),
        );
    }
}

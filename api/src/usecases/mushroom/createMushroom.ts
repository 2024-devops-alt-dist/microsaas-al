import { IMushroomRepository } from 'api/src/interfaces/repositories/IMushroomRepository';
import { Edibility } from 'api/src/domain/constant/edibility';
import { Mushroom } from 'api/src/domain/entities/Mushroom';
import { BadRequestError } from 'api/src/domain/errors/BadRequestError';

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

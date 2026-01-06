import { Mushroom } from '../domain/entities/Mushroom';
import { prisma } from './database/prisma/prisma';
import { Prisma, Mushroom as MushroomPrisma } from './database/prisma/generated/prisma/client';
import { Edibility as DomainEdibility } from '../domain/constant/edibility';

export class MushroomRepository {
    async findAll(): Promise<Mushroom[]> {
        const mushrooms = await prisma.mushroom.findMany();
        const mushroomEntities: Mushroom[] = [];
        for (const mushroom of mushrooms) {
            mushroomEntities.push(this.mapPrismaMushroomToDomain(mushroom));
        }
        return mushroomEntities;
    }

    async findById(id: number): Promise<Mushroom | null> {
        const mushroom = await prisma.mushroom.findUnique({
            where: {
                id,
            },
        });
        return mushroom ? this.mapPrismaMushroomToDomain(mushroom) : null;
    }

    async create(mushroom: Mushroom): Promise<Mushroom> {
        const mushroomPrisma: Prisma.MushroomCreateInput = {
            commonName: mushroom.commonName,
            species: mushroom.species,
            genus: mushroom.genus,
            family: mushroom.family,
            edibility: mushroom.edibility,
            habitat: mushroom.habitat,
            description: mushroom.description,
        };
        const createdMushroom = await prisma.mushroom.create({ data: mushroomPrisma });
        return this.mapPrismaMushroomToDomain(createdMushroom);
    }

    async update(id: number, data: Mushroom): Promise<Mushroom> {
        const mushroomPrisma: Prisma.MushroomUpdateInput = {};
        if (data.commonName !== null) mushroomPrisma.commonName = data.commonName;
        if (data.species !== null) mushroomPrisma.species = data.species;
        if (data.genus !== null) mushroomPrisma.genus = data.genus;
        if (data.family !== null) mushroomPrisma.family = data.family;
        if (data.edibility !== null) mushroomPrisma.edibility = data.edibility;
        if (data.habitat !== null) mushroomPrisma.habitat = data.habitat;
        if (data.description !== null) mushroomPrisma.description = data.description;
        const mushroom = await prisma.mushroom.update({
            where: { id },
            data: mushroomPrisma,
        });
        return this.mapPrismaMushroomToDomain(mushroom);
    }

    async delete(id: number): Promise<void> {
        await prisma.mushroom.delete({
            where: { id },
        });
    }

    private mapEdibilityToDomain(edibility: string): DomainEdibility {
        if (edibility === 'EDIBLE') {
            return DomainEdibility.EDIBLE;
        }
        if (edibility === 'POISONOUS') {
            return DomainEdibility.POISONOUS;
        }
        if (edibility === 'INEDIBLE') {
            return DomainEdibility.INEDIBLE;
        }
        if (edibility === 'DEADLY') {
            return DomainEdibility.DEADLY;
        }
        return DomainEdibility.UNKNOWN;
    }

    private mapPrismaMushroomToDomain(mushroomPrisma: MushroomPrisma): Mushroom {
        return new Mushroom(
            mushroomPrisma.id,
            mushroomPrisma.commonName,
            mushroomPrisma.species,
            mushroomPrisma.genus,
            mushroomPrisma.family,
            this.mapEdibilityToDomain(mushroomPrisma.edibility),
            mushroomPrisma.habitat,
            mushroomPrisma.description,
            mushroomPrisma.createdAt,
            mushroomPrisma.updatedAt,
            [],
            [],
        );
    }
}

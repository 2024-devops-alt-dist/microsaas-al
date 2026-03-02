import {
    ConfidenceLevel,
    ConfidenceLevel as DomainConfidenceLevel,
} from '../domain/constant/confidenceLevel.js';
import { Observation } from '../domain/entities/Observation.js';
import { ObservationCreationType } from '../domain/types/ObservationCreationType.js';
import {
    Prisma,
    Observation as ObservationPrisma,
} from './database/prisma/generated/prisma/client.js';
import { prisma } from './database/prisma/prisma.js';

export class ObservationRepository {
    async findAll(): Promise<Observation[]> {
        const observations = await prisma.observation.findMany();
        const observationsEntities: Observation[] = [];
        for (const observation of observations) {
            observationsEntities.push(this.mapPrismaObservationToDomain(observation));
        }
        return observationsEntities;
    }

    async findById(id: number): Promise<Observation | null> {
        const observation = await prisma.observation.findUnique({
            where: {
                id,
            },
        });
        return observation ? this.mapPrismaObservationToDomain(observation) : null;
    }

    async create(observationCreationType: ObservationCreationType): Promise<Observation> {
        const observationPrisma = {
            title: observationCreationType.title,
            date: observationCreationType.date,
            latitude: observationCreationType.latitude,
            longitude: observationCreationType.longitude,
            quantity: observationCreationType.quantity,
            notes: observationCreationType.notes,
            isPublic: observationCreationType.isPublic,
            confidenceLevel: observationCreationType.confidenceLevel as ConfidenceLevel,
            userId: observationCreationType.userId,
            mushroomId: observationCreationType.mushroomId,
        };
        const createdObservation = await prisma.observation.create({ data: observationPrisma });
        return this.mapPrismaObservationToDomain(createdObservation);
    }

    async update(id: number, data: Observation): Promise<Observation> {
        const observationPrisma: Prisma.ObservationUpdateInput = {};
        if (data.title !== null) observationPrisma.title = data.title;
        if (data.date !== null) observationPrisma.date = data.date;
        if (data.latitude !== null) observationPrisma.latitude = data.latitude;
        if (data.longitude !== null) observationPrisma.longitude = data.longitude;
        if (data.quantity !== null) observationPrisma.quantity = data.quantity;
        if (data.notes !== null) observationPrisma.notes = data.notes;
        if (data.isPublic !== null) observationPrisma.isPublic = data.isPublic;
        if (data.confidenceLevel !== null) observationPrisma.confidenceLevel = data.confidenceLevel;

        const observation = await prisma.observation.update({
            where: { id },
            data: observationPrisma,
        });
        return this.mapPrismaObservationToDomain(observation);
    }

    async delete(id: number): Promise<void> {
        await prisma.observation.delete({
            where: { id },
        });
    }

    private mapConfidenceToDomain(confidence: string): DomainConfidenceLevel {
        if (confidence === 'HIGH') {
            return DomainConfidenceLevel.HIGH;
        }
        if (confidence === 'MEDIUM') {
            return DomainConfidenceLevel.MEDIUM;
        }
        return DomainConfidenceLevel.LOW;
    }

    private mapPrismaObservationToDomain(observationPrisma: ObservationPrisma): Observation {
        return new Observation(
            observationPrisma.id,
            observationPrisma.title,
            observationPrisma.date,
            observationPrisma.latitude!.toNumber(),
            observationPrisma.longitude!.toNumber(),
            observationPrisma.quantity,
            observationPrisma.notes,
            observationPrisma.isPublic,
            this.mapConfidenceToDomain(observationPrisma.confidenceLevel),
            observationPrisma.createdAt,
            observationPrisma.updatedAt,
            observationPrisma.userId,
            observationPrisma.mushroomId,
            [],
            [],
        );
    }
}

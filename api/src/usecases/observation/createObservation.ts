import { ConfidenceLevel } from '../../domain/constant/confidenceLevel.js';
import { Observation } from '../../domain/entities/Observation.js';
import { BadRequestError } from '../../domain/errors/BadRequestError.js';
import { IObservationRepository } from '../../interfaces/repositories/IObservationRepository.js';

export class CreateObservation {
    constructor(private observationRepository: IObservationRepository) {}

    async execute(observationData: {
        title: string;
        date: Date;
        latitude: number;
        longitude: number;
        quantity: number;
        notes: string | null;
        isPublic: boolean;
        confidenceLevel: string;
        userId: number;
        mushroomId: number;
    }): Promise<Observation> {
        if (
            !observationData.title ||
            !observationData.date ||
            observationData.latitude === undefined ||
            observationData.longitude === undefined ||
            observationData.quantity === undefined ||
            observationData.isPublic === undefined ||
            !observationData.confidenceLevel ||
            !observationData.userId
        ) {
            throw new BadRequestError('Invalid observation data');
        }
        const newObservation = {
            title: observationData.title,
            date: observationData.date,
            latitude: observationData.latitude,
            longitude: observationData.longitude,
            quantity: observationData.quantity,
            notes: observationData.notes || null,
            isPublic: observationData.isPublic,
            confidenceLevel: observationData.confidenceLevel as ConfidenceLevel,
            userId: observationData.userId,
            mushroomId: observationData.mushroomId,
        };
        return await this.observationRepository.create(newObservation);
    }
}

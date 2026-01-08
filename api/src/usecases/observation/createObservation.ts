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
        return await this.observationRepository.create(
            new Observation(
                null,
                observationData.title,
                observationData.date,
                observationData.latitude,
                observationData.longitude,
                observationData.quantity,
                observationData.notes,
                observationData.isPublic,
                observationData.confidenceLevel as ConfidenceLevel,
                null,
                null,
                observationData.userId,
                observationData.mushroomId,
                [],
                [],
            ),
        );
    }
}

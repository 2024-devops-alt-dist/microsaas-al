import { ConfidenceLevel } from 'api/src/domain/constant/confidenceLevel';
import { Observation } from 'api/src/domain/entities/Observation';
import { BadRequestError } from 'api/src/domain/errors/BadRequestError';
import { IObservationRepository } from 'api/src/interfaces/repositories/IObservationRepository';

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

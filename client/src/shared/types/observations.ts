import { Image } from './images';

export interface Observation {
    id: number;
    title: string;
    date: Date;
    latitude: number;
    longitude: number;
    quantity: number;
    notes: string | null;
    isPublic: boolean;
    confidenceLevel: ConfidenceLevel;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: number;
    mushroomId: number | null;
    images: Image[];
    comments: Comment[];
}

export type CreateObservationDTO = Omit<Observation, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateObservationDTO = Partial<CreateObservationDTO>;

export enum ConfidenceLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

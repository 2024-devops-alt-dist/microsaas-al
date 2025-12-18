import { ConfidenceLevel } from "../constants/confidenceLevel";

export interface Observation {
    id?: number;
    title: string;
    date: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    quantity: number;
    notes?: string;
    isPublic: boolean;
    confidenceLevel: ConfidenceLevel;
    userId: number;
    mushroomId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
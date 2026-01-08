import { ConfidenceLevel } from 'api/src/domain/constant/confidenceLevel';

export const mockObservation1 = {
    id: 1,
    title: 'First Observation',
    date: new Date('2024-01-01'),
    latitude: 45.1234,
    longitude: -73.5678,
    quantity: 5,
    notes: 'Found near the old oak tree.',
    isPublic: true,
    confidenceLevel: ConfidenceLevel.HIGH,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
    mushroomId: 1,
    images: [],
    comments: [],
};

export const mockObservation2 = {
    id: 2,
    title: 'Second Observation',
    date: new Date('2024-02-15'),
    latitude: 46.5678,
    longitude: -74.1234,
    quantity: 2,
    notes: 'Spotted in the damp area.',
    isPublic: false,
    confidenceLevel: ConfidenceLevel.LOW,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 2,
    mushroomId: 2,
    images: [],
    comments: [],
};

export type ObservationCreationType = {
    title: string;
    latitude: number;
    longitude: number;
    quantity: number;
    notes: string | null;
    isPublic: boolean;
    confidenceLevel: string;
    date: Date;
    userId: number;
    mushroomId: number | null;
};

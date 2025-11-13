export interface Observation {
    id?: number;
    imageUrl?: string;
    location: {
        latitude: number;
        longitude: number;
    };
    date: string;
    observer: string;
    species?: number;
    notes?: string;
}

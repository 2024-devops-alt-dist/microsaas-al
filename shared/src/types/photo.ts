export interface Photo {
    id?: number;
    url: string;
    filename: string;
    mimeType: string;
    size: number;
    observationId?: number;
    mushroomId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
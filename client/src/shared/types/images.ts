export interface Image {
    id: number;
    url: string;
    filename: string;
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    observationId: number;
    mushroomId: number;
}

export type CreateImageDTO = Omit<Image, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateImageDTO = Partial<CreateImageDTO>;
